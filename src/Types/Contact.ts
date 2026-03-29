export interface Contact {
	/** WhatsApp JID (e.g. 628123456789@s.whatsapp.net) **/
	id: string
	/** @deprecated LID is no longer used; `id` is always a JID now **/
	lid?: string
	/** Phone number JID in @s.whatsapp.net format */
	phoneNumber?: string
	/** name of the contact, you have saved on your WA */
	name?: string
	/** name of the contact, the contact has set on their own on WA */
	notify?: string
	/** I have no idea */
	verifiedName?: string
	// Baileys Added
	/**
	 * Url of the profile picture of the contact
	 *
	 * 'changed' => if the profile picture has changed
	 * null => if the profile picture has not been set (default profile picture)
	 * any other string => url of the profile picture
	 */
	imgUrl?: string | null
	status?: string
}
