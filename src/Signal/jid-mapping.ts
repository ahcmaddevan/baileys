/**
 * JID Mapping Store
 *
 * Replaces the old LID mapping system. Instead of mapping phone numbers (PN)
 * to random LID identifiers, we now use JIDs directly (e.g. 628xxx@s.whatsapp.net).
 *
 * The store still handles cases where the server sends LID addresses by
 * transparently converting them to JIDs on the fly.
 */
import { LRUCache } from 'lru-cache'
import type { JIDMapping, SignalKeyStoreWithTransaction } from '../Types'
import type { ILogger } from '../Utils/logger'
import { isHostedPnUser, isLidUser, isPnUser, jidDecode, jidNormalizedUser, jidEncode } from '../WABinary'

export class JIDMappingStore {
	private readonly mappingCache = new LRUCache<string, string>({
		ttl: 3 * 24 * 60 * 60 * 1000,
		ttlAutopurge: true,
		updateAgeOnGet: true
	})
	private readonly keys: SignalKeyStoreWithTransaction
	private readonly logger: ILogger

	private pnToJIDFunc?: (jids: string[]) => Promise<JIDMapping[] | undefined>

	private readonly inflightJIDLookups = new Map<string, Promise<JIDMapping[] | null>>()
	private readonly inflightPNLookups = new Map<string, Promise<JIDMapping[] | null>>()

	constructor(
		keys: SignalKeyStoreWithTransaction,
		logger: ILogger,
		pnToJIDFunc?: (jids: string[]) => Promise<JIDMapping[] | undefined>
	) {
		this.keys = keys
		this.pnToJIDFunc = pnToJIDFunc
		this.logger = logger
	}

	/**
	 * Converts a LID JID to a regular JID if possible.
	 * e.g. "1939293939393@lid" → "628xxx@s.whatsapp.net"
	 */
	private async lidToJid(lid: string): Promise<string | null> {
		if (!isLidUser(lid)) return null
		const decoded = jidDecode(lid)
		if (!decoded) return null
		const cached = this.mappingCache.get(`lid:${decoded.user}`)
		if (cached) return cached
		const stored = await this.keys.get('jid-mapping', [`lid:${decoded.user}`])
		const jid = stored[`lid:${decoded.user}`]
		if (jid) {
			this.mappingCache.set(`lid:${decoded.user}`, jid)
			return jid
		}
		return null
	}

	/**
	 * Store JID-PN mappings.
	 * Accepts both JID-style and LID-style addresses for backwards compat.
	 */
	async storeJIDPNMappings(pairs: JIDMapping[]): Promise<void> {
		if (pairs.length === 0) return

		const batchData: { [key: string]: string } = {}
		for (const pair of pairs) {
			// pair.jid may be a real JID or a legacy LID address
			let jid = pair.jid
			const pn = pair.pn

			if (!pn || !jid) continue

			const pnDecoded = jidDecode(pn)
			if (!pnDecoded) continue

			// If jid is actually a LID, store a lid→pn entry too
			if (isLidUser(jid)) {
				const lidDecoded = jidDecode(jid)
				if (lidDecoded) {
					const pnJid = `${pnDecoded.user}@s.whatsapp.net`
					batchData[`lid:${lidDecoded.user}`] = pnJid
					this.mappingCache.set(`lid:${lidDecoded.user}`, pnJid)
					this.logger.debug({ lid: jid, jid: pnJid }, 'Stored LID→JID mapping')
				}
				continue
			}

			// Standard PN→JID mapping
			const jidDecoded = jidDecode(jid)
			if (!jidDecoded) continue

			const normalizedJid = `${jidDecoded.user}@s.whatsapp.net`
			batchData[`pn:${pnDecoded.user}`] = normalizedJid
			batchData[`jid:${jidDecoded.user}`] = `${pnDecoded.user}@s.whatsapp.net`
			this.mappingCache.set(`pn:${pnDecoded.user}`, normalizedJid)
			this.mappingCache.set(`jid:${jidDecoded.user}`, `${pnDecoded.user}@s.whatsapp.net`)
		}

		if (Object.keys(batchData).length === 0) return

		await this.keys.transaction(async () => {
			await this.keys.set({ 'jid-mapping': batchData })
		}, 'jid-mapping')
	}

	/** @deprecated use storeJIDPNMappings */
	async storeLIDPNMappings(pairs: { lid: string; pn: string }[]): Promise<void> {
		return this.storeJIDPNMappings(pairs.map(p => ({ jid: p.lid, pn: p.pn })))
	}

	/**
	 * Get the JID for a given PN. Returns the same PN as JID if no mapping found
	 * (because PN IS already a JID in our system).
	 */
	async getJIDForPN(pn: string): Promise<string | null> {
		return (await this.getJIDsForPNs([pn]))?.[0]?.jid || null
	}

	/** @deprecated use getJIDForPN */
	async getLIDForPN(pn: string): Promise<string | null> {
		return this.getJIDForPN(pn)
	}

	async getJIDsForPNs(pns: string[]): Promise<JIDMapping[] | null> {
		if (pns.length === 0) return null

		const sortedPns = [...new Set(pns)].sort()
		const cacheKey = sortedPns.join(',')

		const inflight = this.inflightJIDLookups.get(cacheKey)
		if (inflight) return inflight

		const promise = this._getJIDsForPNsImpl(pns)
		this.inflightJIDLookups.set(cacheKey, promise)

		try {
			return await promise
		} finally {
			this.inflightJIDLookups.delete(cacheKey)
		}
	}

	/** @deprecated use getJIDsForPNs */
	async getLIDsForPNs(pns: string[]): Promise<JIDMapping[] | null> {
		return this.getJIDsForPNs(pns)
	}

	private async _getJIDsForPNsImpl(pns: string[]): Promise<JIDMapping[] | null> {
		const results: JIDMapping[] = []

		for (const pn of pns) {
			if (!isPnUser(pn) && !isHostedPnUser(pn)) continue

			const decoded = jidDecode(pn)
			if (!decoded) continue

			// In JID-first mode, the PN is already a valid JID
			const normalizedJid = `${decoded.user}@s.whatsapp.net`

			// Check if we have a cached different JID for this PN
			const cached = this.mappingCache.get(`pn:${decoded.user}`)
			const jid = cached || normalizedJid

			results.push({ pn, jid })
		}

		return results.length > 0 ? results : null
	}

	async getPNForJID(jid: string): Promise<string | null> {
		return (await this.getPNsForJIDs([jid]))?.[0]?.pn || null
	}

	/** @deprecated use getPNForJID */
	async getPNForLID(lid: string): Promise<string | null> {
		// If it's a real LID, try to resolve it
		if (isLidUser(lid)) {
			const resolved = await this.lidToJid(lid)
			return resolved || null
		}
		return this.getPNForJID(lid)
	}

	async getPNsForJIDs(jids: string[]): Promise<JIDMapping[] | null> {
		if (jids.length === 0) return null

		const sortedJids = [...new Set(jids)].sort()
		const cacheKey = sortedJids.join(',')

		const inflight = this.inflightPNLookups.get(cacheKey)
		if (inflight) return inflight

		const promise = this._getPNsForJIDsImpl(jids)
		this.inflightPNLookups.set(cacheKey, promise)

		try {
			return await promise
		} finally {
			this.inflightPNLookups.delete(cacheKey)
		}
	}

	/** @deprecated use getPNsForJIDs */
	async getPNsForLIDs(lids: string[]): Promise<JIDMapping[] | null> {
		return this.getPNsForJIDs(lids)
	}

	private async _getPNsForJIDsImpl(jids: string[]): Promise<JIDMapping[] | null> {
		const results: JIDMapping[] = []

		for (const jid of jids) {
			// Handle legacy LID addresses
			if (isLidUser(jid)) {
				const resolved = await this.lidToJid(jid)
				if (resolved) {
					results.push({ jid: resolved, pn: resolved })
				}
				continue
			}

			const decoded = jidDecode(jid)
			if (!decoded) continue

			// In JID-first mode, JID == PN, just normalise
			const pn = `${decoded.user}@s.whatsapp.net`
			results.push({ jid, pn })
		}

		return results.length > 0 ? results : null
	}

	/**
	 * Resolve any address (JID, PN, or legacy LID) to a canonical JID.
	 * This is the main utility method for internal use.
	 */
	async resolveToJID(address: string): Promise<string> {
		if (isLidUser(address)) {
			const resolved = await this.lidToJid(address)
			if (resolved) return resolved
			this.logger.warn({ address }, 'Could not resolve LID to JID, returning as-is')
			return address
		}
		const decoded = jidDecode(address)
		if (!decoded) return address
		return `${decoded.user}@s.whatsapp.net`
	}
}
