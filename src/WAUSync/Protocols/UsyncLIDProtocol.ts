/**
 * USyncLIDProtocol
 *
 * This protocol is used to query WhatsApp's USync service for LID information.
 * The server still speaks in LID addresses; results are mapped to JIDs by
 * JIDMappingStore in JID-first mode, so callers never need to handle LIDs directly.
 */
import type { USyncQueryProtocol } from '../../Types/USync'
import type { BinaryNode } from '../../WABinary'
import type { USyncUser } from '../USyncUser'

export class USyncLIDProtocol implements USyncQueryProtocol {
	name = 'lid'

	getQueryElement(): BinaryNode {
		return {
			tag: 'lid',
			attrs: {}
		}
	}

	getUserElement(user: USyncUser): BinaryNode | null {
		if (user.lid) {
			return {
				tag: 'lid',
				attrs: { jid: user.lid }
			}
		} else {
			return null
		}
	}

	parser(node: BinaryNode): string | null {
		if (node.tag === 'lid') {
			return node.attrs.val!
		}

		return null
	}
}
