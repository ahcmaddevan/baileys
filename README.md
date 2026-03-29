<h1 align='center'><img alt="Baileys logo" src="https://raw.githubusercontent.com/WhiskeySockets/Baileys/refs/heads/master/Media/logo.png" height="75"/></h1>

<div align='center'>Baileys is a WebSockets-based TypeScript library for interacting with the WhatsApp Web API.</div>

<div align='center'>

**Fork by [whiskeysockets/baileys](https://github.com/whiskeysockets/baileys) — Modified & maintained by [lynovratech](https://github.com/ahcmaddevan)**

[![NPM Version](https://img.shields.io/npm/v/@lynovratech/baileys)](https://www.npmjs.com/package/@lynovratech/baileys)
[![ESM](https://img.shields.io/badge/module-ESM-brightgreen)](https://www.npmjs.com/package/@lynovratech/baileys)
[![CJS](https://img.shields.io/badge/module-CJS-blue)](https://www.npmjs.com/package/@lynovratech/baileys)
[![License](https://img.shields.io/npm/l/@lynovratech/baileys)](LICENSE)

</div>

---

## 🔀 About This Fork

This is **`@lynovratech/baileys`** — a fork of the original [whiskeysockets/baileys](https://github.com/whiskeysockets/baileys) with the following modifications:

- ✅ **Dual module support**: both **ESM** (`import`) and **CJS** (`require`) in one package
- ✅ TypeScript compatibility fixes
- ✅ Stays in sync with upstream whiskeysockets/baileys updates

## 📦 Install

```bash
npm install @lynovratech/baileys
```

Or as a drop-in replacement for the original:

```bash
npm install baileys@npm:@lynovratech/baileys
```

## 🔧 Module Support

### ESM (`import`)
```ts
import makeWASocket, { useMultiFileAuthState } from '@lynovratech/baileys'
```

### CJS (`require`)
```js
const { default: makeWASocket, useMultiFileAuthState } = require('@lynovratech/baileys')
```

---

> [!CAUTION]
> NOTICE OF BREAKING CHANGE.
>
> As of 7.0.0, multiple breaking changes were introduced into the library.
>
> Please check out https://whiskey.so/migrate-latest for more information.

# Important Note
This is a temporary README.md, the new guide is in development and will this file will be replaced with .github/README.md (already a default on GitHub).

New guide link: https://baileys.wiki

# Get Support

If you'd like business to enterprise-level support from Rajeh, the current maintainer of Baileys, you can book a video chat. Book a 1 hour time slot by contacting him on Discord or pre-ordering [here](https://purpshell.dev/book). The earlier you pre-order the better, as his time slots usually fill up very quickly. He offers immense value per hour and will answer all your questions before the time runs out.

If you are a business, we encourage you to contribute back to the high development costs of the project and to feed the maintainers who dump tens of hours a week on this. You can do so by booking meetings or sponsoring below. All support, even in bona fide / contribution hours, is welcome by businesses of all sizes. This is not condoning or endorsing businesses to use the library. See the Disclaimer below.

# Sponsor
If you'd like to financially support this project, you can do so by supporting the current maintainer [here](https://purpshell.dev/sponsor).

# Disclaimer
This project is not affiliated, associated, authorized, endorsed by, or in any way officially connected with WhatsApp or any of its subsidiaries or its affiliates.
The official WhatsApp website can be found at whatsapp.com. "WhatsApp" as well as related names, marks, emblems and images are registered trademarks of their respective owners.

The maintainers of Baileys do not in any way condone the use of this application in practices that violate the Terms of Service of WhatsApp. The maintainers of this application call upon the personal responsibility of its users to use this application in a fair way, as it is intended to be used.
Use at your own discretion. Do not spam people with this. We discourage any stalkerware, bulk or automated messaging usage.

##

- Baileys does not require Selenium or any other browser to be interface with WhatsApp Web, it does so directly using a **WebSocket**.
- Not running Selenium or Chromium saves you like **half a gig** of ram :/
- Baileys supports interacting with the multi-device & web versions of WhatsApp.
- Thank you to [@pokearaujo](https://github.com/pokearaujo/multidevice) for writing his observations on the workings of WhatsApp Multi-Device. Also, thank you to [@Sigalor](https://github.com/sigalor/whatsapp-web-reveng) for writing his observations on the workings of WhatsApp Web and thanks to [@Rhymen](https://github.com/Rhymen/go-whatsapp/) for the __go__ implementation.

> [!IMPORTANT]
> The original repository had to be removed by the original author - we now continue development in this repository here.
> This is the only official repository and is maintained by the community.
> **Join the Discord [here](https://discord.gg/WeJM5FP9GG)**

## Example

Do check out & run [example.ts](Example/example.ts) to see an example usage of the library.
The script covers most common use cases.
To run the example script, download or clone the repo and then type the following in a terminal:
1. ``` cd path/to/Baileys ```
2. ``` yarn ```
3. ``` yarn example ```

## Install

Use the stable version:
```
npm install @lynovratech/baileys
```

Use the edge version (no guarantee of stability, but latest fixes + features):
```
npm install github:lynovratech/baileys
```

Then import your code using:
```ts
import makeWASocket from '@lynovratech/baileys'
```

# Links

- [Discord](https://discord.gg/WeJM5FP9GG)
- [Docs](https://guide.whiskeysockets.io/)
- [NPM](https://www.npmjs.com/package/@lynovratech/baileys)
- [GitHub](https://github.com/ahcmaddevan/baileys)

# Index

- [Connecting Account](#connecting-account)
    - [Connect with QR-CODE](#starting-socket-with-qr-code)
    - [Connect with Pairing Code](#starting-socket-with-pairing-code)
    - [Receive Full History](#receive-full-history)
- [Important Notes About Socket Config](#important-notes-about-socket-config)
    - [Caching Group Metadata (Recommended)](#caching-group-metadata-recommended)
    - [Improve Retry System & Decrypt Poll Votes](#improve-retry-system--decrypt-poll-votes)
    - [Receive Notifications in Whatsapp App](#receive-notifications-in-whatsapp-app)
- [Save Auth Info](#saving--restoring-sessions)
- [Handling Events](#handling-events)
    - [Example to Start](#example-to-start)
    - [Decrypt Poll Votes](#decrypt-poll-votes)
    - [Summary of Events on First Connection](#summary-of-events-on-first-connection)
- [Implementing a Data Store](#implementing-a-data-store)
- [Whatsapp IDs Explain](#whatsapp-ids-explain)
- [Utility Functions](#utility-functions)
- [Sending Messages](#sending-messages)
    - [Non-Media Messages](#non-media-messages)
        - [Text Message](#text-message)
        - [Quote Message](#quote-message-works-with-all-types)
        - [Mention User](#mention-user-works-with-most-types)
        - [Forward Messages](#forward-messages)
        - [Location Message](#location-message)
        - [Contact Message](#contact-message)
        - [Reaction Message](#reaction-message)
        - [Pin Message](#pin-message)
        - [Poll Message](#poll-message)
    - [Sending with Link Preview](#sending-messages-with-link-previews)
    - [Media Messages](#media-messages)
        - [Gif Message](#gif-message)
        - [Video Message](#video-message)
        - [Audio Message](#audio-message)
        - [Image Message](#image-message)
        - [ViewOnce Message](#view-once-message)
- [Modify Messages](#modify-messages)
    - [Delete Messages (for everyone)](#deleting-messages-for-everyone)
    - [Edit Messages](#editing-messages)
- [Manipulating Media Messages](#manipulating-media-messages)
    - [Thumbnail in Media Messages](#thumbnail-in-media-messages)
    - [Downloading Media Messages](#downloading-media-messages)
    - [Re-upload Media Message to Whatsapp](#re-upload-media-message-to-whatsapp)
- [Reject Call](#reject-call)
- [Send States in Chat](#send-states-in-chat)
    - [Reading Messages](#reading-messages)
    - [Update Presence](#update-presence)
- [Modifying Chats](#modifying-chats)
    - [Archive a Chat](#archive-a-chat)
    - [Mute/Unmute a Chat](#muteunmute-a-chat)
    - [Mark a Chat Read/Unread](#mark-a-chat-readunread)
    - [Delete a Message for Me](#delete-a-message-for-me)
    - [Delete a Chat](#delete-a-chat)
    - [Star/Unstar a Message](#starunstar-a-message)
    - [Disappearing Messages](#disappearing-messages)
- [User Querys](#user-querys)
    - [Check If ID Exists in Whatsapp](#check-if-id-exists-in-whatsapp)
    - [Query Chat History (groups too)](#query-chat-history-groups-too)
    - [Fetch Status](#fetch-status)
    - [Fetch Profile Picture (groups too)](#fetch-profile-picture-groups-too)
    - [Fetch Bussines Profile (such as description or category)](#fetch-bussines-profile-such-as-description-or-category)
    - [Fetch Someone's Presence (if they're typing or online)](#fetch-someones-presence-if-theyre-typing-or-online)
- [Change Profile](#change-profile)
    - [Change Profile Status](#change-profile-status)
    - [Change Profile Name](#change-profile-name)
    - [Change Display Picture (groups too)](#change-display-picture-groups-too)
    - [Remove display picture (groups too)](#remove-display-picture-groups-too)
- [Groups](#groups)
- [Privacy](#privacy)
- [Broadcast Lists & Stories](#broadcast-lists--stories)
- [Writing Custom Functionality](#writing-custom-functionality)

## Connecting Account

WhatsApp provides a multi-device API that allows Baileys to be authenticated as a second WhatsApp client by scanning a **QR code** or **Pairing Code** with WhatsApp on your phone.

> [!NOTE]
> **[Here](#example-to-start) is a simple example of event handling**

> [!TIP]
> **You can see all supported socket configs [here](https://baileys.whiskeysockets.io/types/SocketConfig.html) (Recommended)**

### Starting socket with **QR-CODE**

> [!TIP]
> You can customize browser name if you connect with **QR-CODE**, with `Browser` constant, we have some browsers config, **see [here](https://baileys.whiskeysockets.io/types/BrowsersMap.html)**

```ts
import makeWASocket from '@lynovratech/baileys'

const sock = makeWASocket({
    browser: Browsers.ubuntu('My App'),
    printQRInTerminal: true
})
```

If the connection is successful, you will see a QR code printed on your terminal screen, scan it with WhatsApp on your phone and you'll be logged in!

### Starting socket with **Pairing Code**

> [!IMPORTANT]
> Pairing Code isn't Mobile API, it's a method to connect Whatsapp Web without QR-CODE, you can connect only with one device, see [here](https://faq.whatsapp.com/1324084875126592/?cms_platform=web)

The phone number can't have `+` or `()` or `-`, only numbers, you must provide country code

```ts
import makeWASocket from '@lynovratech/baileys'

const sock = makeWASocket({
    printQRInTerminal: false
})

if (!sock.authState.creds.registered) {
    const number = 'XXXXXXXXXXX'
    const code = await sock.requestPairingCode(number)
    console.log(code)
}
```

### Receive Full History

1. Set `syncFullHistory` as `true`
2. Baileys, by default, use chrome browser config
    - If you'd like to emulate a desktop connection (and receive more message history), use this browser setting:

```ts
const sock = makeWASocket({
    ...otherOpts,
    browser: Browsers.macOS('Desktop'),
    syncFullHistory: true
})
```

## Important Notes About Socket Config

### Caching Group Metadata (Recommended)
- If you use baileys for groups, we recommend you to set `cachedGroupMetadata` in socket config:

    ```ts
    const groupCache = new NodeCache({stdTTL: 5 * 60, useClones: false})

    const sock = makeWASocket({
        cachedGroupMetadata: async (jid) => groupCache.get(jid)
    })

    sock.ev.on('groups.update', async ([event]) => {
        const metadata = await sock.groupMetadata(event.id)
        groupCache.set(event.id, metadata)
    })

    sock.ev.on('group-participants.update', async (event) => {
        const metadata = await sock.groupMetadata(event.id)
        groupCache.set(event.id, metadata)
    })
    ```

### Improve Retry System & Decrypt Poll Votes
```ts
const sock = makeWASocket({
    getMessage: async (key) => await getMessageFromStore(key)
})
```

### Receive Notifications in Whatsapp App
```ts
const sock = makeWASocket({
    markOnlineOnConnect: false
})
```

## Saving & Restoring Sessions

```ts
import makeWASocket, { useMultiFileAuthState } from '@lynovratech/baileys'

const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys')

const sock = makeWASocket({ auth: state })

sock.ev.on('creds.update', saveCreds)
```

> [!IMPORTANT]
> `useMultiFileAuthState` is a utility function to help save the auth state in a single folder, this function serves as a good guide to help write auth & key states for SQL/no-SQL databases, which I would recommend in any production grade system.

## Handling Events

Baileys uses the EventEmitter syntax for events. They're all nicely typed up, so you shouldn't have any issues with an Intellisense editor like VS Code.

> [!IMPORTANT]
> **The events are [these](https://baileys.whiskeysockets.io/types/BaileysEventMap.html)**, it's important you see all events

```ts
const sock = makeWASocket()
sock.ev.on('messages.upsert', ({ messages }) => {
    console.log('got messages', messages)
})
```

### Example to Start

```ts
import makeWASocket, { DisconnectReason, useMultiFileAuthState } from '@lynovratech/baileys'
import { Boom } from '@hapi/boom'

async function connectToWhatsApp () {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys')
    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true
    })
    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update
        if(connection === 'close') {
            const shouldReconnect = (lastDisconnect.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut
            console.log('connection closed due to ', lastDisconnect.error, ', reconnecting ', shouldReconnect)
            if(shouldReconnect) {
                connectToWhatsApp()
            }
        } else if(connection === 'open') {
            console.log('opened connection')
        }
    })
    sock.ev.on('messages.upsert', event => {
        for (const m of event.messages) {
            console.log(JSON.stringify(m, undefined, 2))
            console.log('replying to', m.key.remoteJid)
            await sock.sendMessage(m.key.remoteJid!, { text: 'Hello Word' })
        }
    })
    sock.ev.on('creds.update', saveCreds)
}

connectToWhatsApp()
```

### Decrypt Poll Votes

```ts
sock.ev.on('messages.update', event => {
    for(const { key, update } of event) {
        if(update.pollUpdates) {
            const pollCreation = await getMessage(key)
            if(pollCreation) {
                console.log(
                    'got poll update, aggregation: ',
                    getAggregateVotesInPollMessage({
                        message: pollCreation,
                        pollUpdates: update.pollUpdates,
                    })
                )
            }
        }
    }
})
```

### Summary of Events on First Connection

1. When you connect first time, `connection.update` will be fired requesting you to restart sock
2. Then, history messages will be received in `messaging.history-set`

## Implementing a Data Store

```ts
import makeWASocket, { makeInMemoryStore } from '@lynovratech/baileys'

const store = makeInMemoryStore({ })
store.readFromFile('./baileys_store.json')
setInterval(() => {
    store.writeToFile('./baileys_store.json')
}, 10_000)

const sock = makeWASocket({ })
store.bind(sock.ev)

sock.ev.on('chats.upsert', () => {
    console.log('got chats', store.chats.all())
})

sock.ev.on('contacts.upsert', () => {
    console.log('got contacts', Object.values(store.contacts))
})
```

## Whatsapp IDs Explain

- `id` is the WhatsApp ID, called `jid` too, of the person or group you're sending the message to.
    - It must be in the format ```[country code][phone number]@s.whatsapp.net```
        - Example for people: ```+19999999999@s.whatsapp.net```.
        - For groups, it must be in the format ``` 123456789-123345@g.us ```.
    - For broadcast lists, it's `[timestamp of creation]@broadcast`.
    - For stories, the ID is `status@broadcast`.

## Utility Functions

- `getContentType`, returns the content type for any message
- `getDevice`, returns the device from message
- `makeCacheableSignalKeyStore`, make auth store more fast
- `downloadContentFromMessage`, download content from any message

## Sending Messages

```ts
const jid: string
const content: AnyMessageContent
const options: MiscMessageGenerationOptions

sock.sendMessage(jid, content, options)
```

### Non-Media Messages

#### Text Message
```ts
await sock.sendMessage(jid, { text: 'hello word' })
```

#### Quote Message (works with all types)
```ts
await sock.sendMessage(jid, { text: 'hello word' }, { quoted: message })
```

#### Mention User (works with most types)
```ts
await sock.sendMessage(
    jid,
    {
        text: '@12345678901',
        mentions: ['12345678901@s.whatsapp.net']
    }
)
```

#### Forward Messages
```ts
const msg = getMessageFromStore()
await sock.sendMessage(jid, { forward: msg })
```

#### Location Message
```ts
await sock.sendMessage(
    jid,
    {
        location: {
            degreesLatitude: 24.121231,
            degreesLongitude: 55.1121221
        }
    }
)
```

#### Contact Message
```ts
const vcard = 'BEGIN:VCARD\n'
            + 'VERSION:3.0\n'
            + 'FN:Jeff Singh\n'
            + 'ORG:Ashoka Uni;\n'
            + 'TEL;type=CELL;type=VOICE;waid=911234567890:+91 12345 67890\n'
            + 'END:VCARD'

await sock.sendMessage(
    id,
    {
        contacts: {
            displayName: 'Jeff',
            contacts: [{ vcard }]
        }
    }
)
```

#### Reaction Message
```ts
await sock.sendMessage(
    jid,
    {
        react: {
            text: '💖',
            key: message.key
        }
    }
)
```

#### Pin Message

| Time  | Seconds        |
|-------|----------------|
| 24h    | 86.400        |
| 7d     | 604.800       |
| 30d    | 2.592.000     |

```ts
await sock.sendMessage(
    jid,
    {
        pin: {
            type: 1,
            time: 86400,
            key: message.key
        }
    }
)
```

#### Poll Message
```ts
await sock.sendMessage(
    jid,
    {
        poll: {
            name: 'My Poll',
            values: ['Option 1', 'Option 2'],
            selectableCount: 1,
            toAnnouncementGroup: false
        }
    }
)
```

### Sending Messages with Link Previews

1. Add `link-preview-js` as a dependency: `npm install link-preview-js`
2. Send a link:
```ts
await sock.sendMessage(
    jid,
    {
        text: 'Hi, this was sent using https://github.com/ahcmaddevan/baileys'
    }
)
```

### Media Messages

#### Gif Message
```ts
await sock.sendMessage(
    jid,
    {
        video: fs.readFileSync('Media/ma_gif.mp4'),
        caption: 'hello word',
        gifPlayback: true
    }
)
```

#### Video Message
```ts
await sock.sendMessage(
    id,
    {
        video: { url: './Media/ma_gif.mp4' },
        caption: 'hello word',
        ptv: false
    }
)
```

#### Audio Message
```ts
await sock.sendMessage(
    jid,
    {
        audio: { url: './Media/audio.mp3' },
        mimetype: 'audio/mp4'
    }
)
```

#### Image Message
```ts
await sock.sendMessage(
    id,
    {
        image: { url: './Media/ma_img.png' },
        caption: 'hello word'
    }
)
```

#### View Once Message
```ts
await sock.sendMessage(
    id,
    {
        image: { url: './Media/ma_img.png' },
        viewOnce: true,
        caption: 'hello word'
    }
)
```

## Modify Messages

### Deleting Messages (for everyone)
```ts
const msg = await sock.sendMessage(jid, { text: 'hello word' })
await sock.sendMessage(jid, { delete: msg.key })
```

### Editing Messages
```ts
await sock.sendMessage(jid, {
    text: 'updated text goes here',
    edit: response.key,
})
```

## Manipulating Media Messages

### Downloading Media Messages
```ts
import { createWriteStream } from 'fs'
import { downloadMediaMessage, getContentType } from '@lynovratech/baileys'

sock.ev.on('messages.upsert', async ({ messages: [m] }) => {
    if (!m.message) return
    const messageType = getContentType(m)

    if (messageType === 'imageMessage') {
        const stream = await downloadMediaMessage(
            m,
            'stream',
            { },
            {
                logger,
                reuploadRequest: sock.updateMediaMessage
            }
        )
        const writeStream = createWriteStream('./my-download.jpeg')
        stream.pipe(writeStream)
    }
})
```

### Re-upload Media Message to Whatsapp
```ts
await sock.updateMediaMessage(msg)
```

## Reject Call
```ts
await sock.rejectCall(callId, callFrom)
```

## Send States in Chat

### Reading Messages
```ts
const key: WAMessageKey
await sock.readMessages([key])
```

### Update Presence
```ts
await sock.sendPresenceUpdate('available', jid)
```

## Modifying Chats

### Archive a Chat
```ts
const lastMsgInChat = await getLastMessageInChat(jid)
await sock.chatModify({ archive: true, lastMessages: [lastMsgInChat] }, jid)
```

### Mute/Unmute a Chat

| Time  | Miliseconds     |
|-------|-----------------|
| Remove | null           |
| 8h     | 86.400.000     |
| 7d     | 604.800.000    |

```ts
await sock.chatModify({ mute: 8 * 60 * 60 * 1000 }, jid)
await sock.chatModify({ mute: null }, jid)
```

### Mark a Chat Read/Unread
```ts
const lastMsgInChat = await getLastMessageInChat(jid)
await sock.chatModify({ markRead: false, lastMessages: [lastMsgInChat] }, jid)
```

### Delete a Message for Me
```ts
await sock.chatModify(
    {
        clear: {
            messages: [{ id: 'ATWYHDNNWU81732J', fromMe: true, timestamp: '1654823909' }]
        }
    },
    jid
)
```

### Delete a Chat
```ts
const lastMsgInChat = await getLastMessageInChat(jid)
await sock.chatModify({
    delete: true,
    lastMessages: [{ key: lastMsgInChat.key, messageTimestamp: lastMsgInChat.messageTimestamp }]
}, jid)
```

### Star/Unstar a Message
```ts
await sock.chatModify({
    star: {
        messages: [{ id: 'messageID', fromMe: true }],
        star: true
    }
}, jid)
```

### Disappearing Messages

| Time  | Seconds        |
|-------|----------------|
| Remove | 0          |
| 24h    | 86.400     |
| 7d     | 604.800    |
| 90d    | 7.776.000  |

```ts
await sock.sendMessage(jid, { disappearingMessagesInChat: WA_DEFAULT_EPHEMERAL })
await sock.sendMessage(jid, { text: 'hello' }, { ephemeralExpiration: WA_DEFAULT_EPHEMERAL })
await sock.sendMessage(jid, { disappearingMessagesInChat: false })
```

## User Querys

### Check If ID Exists in Whatsapp
```ts
const [result] = await sock.onWhatsApp(jid)
if (result.exists) console.log (`${jid} exists on WhatsApp, as jid: ${result.jid}`)
```

### Query Chat History (groups too)
```ts
const msg = await getOldestMessageInChat(jid)
await sock.fetchMessageHistory(50, msg.key, msg.messageTimestamp)
```

### Fetch Status
```ts
const status = await sock.fetchStatus(jid)
console.log('status: ' + status)
```

### Fetch Profile Picture (groups too)
```ts
const ppUrl = await sock.profilePictureUrl(jid)
const ppUrlHigh = await sock.profilePictureUrl(jid, 'image')
```

### Fetch Bussines Profile
```ts
const profile = await sock.getBusinessProfile(jid)
console.log('business description: ' + profile.description + ', category: ' + profile.category)
```

### Fetch Someone's Presence
```ts
sock.ev.on('presence.update', console.log)
await sock.presenceSubscribe(jid)
```

## Change Profile

### Change Profile Status
```ts
await sock.updateProfileStatus('Hello World!')
```

### Change Profile Name
```ts
await sock.updateProfileName('My name')
```

### Change Display Picture (groups too)
```ts
await sock.updateProfilePicture(jid, { url: './new-profile-picture.jpeg' })
```

### Remove display picture (groups too)
```ts
await sock.removeProfilePicture(jid)
```

## Groups

### Create a Group
```ts
const group = await sock.groupCreate('My Fab Group', ['1234@s.whatsapp.net', '4564@s.whatsapp.net'])
console.log('created group with id: ' + group.gid)
await sock.sendMessage(group.id, { text: 'hello there' })
```

### Add/Remove or Demote/Promote
```ts
await sock.groupParticipantsUpdate(
    jid,
    ['abcd@s.whatsapp.net', 'efgh@s.whatsapp.net'],
    'add' // 'remove' | 'demote' | 'promote'
)
```

### Change Subject (name)
```ts
await sock.groupUpdateSubject(jid, 'New Subject!')
```

### Change Description
```ts
await sock.groupUpdateDescription(jid, 'New Description!')
```

### Change Settings
```ts
await sock.groupSettingUpdate(jid, 'announcement')
await sock.groupSettingUpdate(jid, 'not_announcement')
await sock.groupSettingUpdate(jid, 'unlocked')
await sock.groupSettingUpdate(jid, 'locked')
```

### Leave a Group
```ts
await sock.groupLeave(jid)
```

### Get Invite Code
```ts
const code = await sock.groupInviteCode(jid)
console.log('group code: ' + code)
```

### Revoke Invite Code
```ts
const code = await sock.groupRevokeInvite(jid)
console.log('New group code: ' + code)
```

### Join Using Invitation Code
```ts
const response = await sock.groupAcceptInvite(code)
console.log('joined to: ' + response)
```

### Query Metadata
```ts
const metadata = await sock.groupMetadata(jid)
console.log(metadata.id + ', title: ' + metadata.subject + ', description: ' + metadata.desc)
```

### Get All Participating Groups Metadata
```ts
const response = await sock.groupFetchAllParticipating()
console.log(response)
```

### Toggle Ephemeral
```ts
await sock.groupToggleEphemeral(jid, 86400)
```

### Change Add Mode
```ts
await sock.groupMemberAddMode(jid, 'all_member_add') // or 'admin_add'
```

## Privacy

### Block/Unblock User
```ts
await sock.updateBlockStatus(jid, 'block')
await sock.updateBlockStatus(jid, 'unblock')
```

### Get Privacy Settings
```ts
const privacySettings = await sock.fetchPrivacySettings(true)
console.log('privacy settings: ' + privacySettings)
```

### Get BlockList
```ts
const response = await sock.fetchBlocklist()
console.log(response)
```

### Update LastSeen Privacy
```ts
await sock.updateLastSeenPrivacy('all') // 'contacts' | 'contact_blacklist' | 'none'
```

### Update Online Privacy
```ts
await sock.updateOnlinePrivacy('all') // 'match_last_seen'
```

### Update Profile Picture Privacy
```ts
await sock.updateProfilePicturePrivacy('all') // 'contacts' | 'contact_blacklist' | 'none'
```

### Update Status Privacy
```ts
await sock.updateStatusPrivacy('all') // 'contacts' | 'contact_blacklist' | 'none'
```

### Update Read Receipts Privacy
```ts
await sock.updateReadReceiptsPrivacy('all') // 'none'
```

### Update Groups Add Privacy
```ts
await sock.updateGroupsAddPrivacy('all') // 'contacts' | 'contact_blacklist'
```

### Update Default Disappearing Mode
```ts
await sock.updateDefaultDisappearingMode(86400)
```

## Broadcast Lists & Stories

### Send Broadcast & Stories
```ts
await sock.sendMessage(
    jid,
    {
        image: { url: url },
        caption: caption
    },
    {
        backgroundColor: backgroundColor,
        font: font,
        statusJidList: statusJidList,
        broadcast: true
    }
)
```

### Query a Broadcast List's Recipients & Name
```ts
const bList = await sock.getBroadcastListInfo('1234@broadcast')
console.log (`list name: ${bList.name}, recps: ${bList.recipients}`)
```

## Writing Custom Functionality

### Enabling Debug Level in Baileys Logs
```ts
const sock = makeWASocket({
    logger: P({ level: 'debug' }),
})
```

### Register a Callback for Websocket Events
```ts
sock.ws.on('CB:edge_routing', (node: BinaryNode) => { })
sock.ws.on('CB:edge_routing,id:abcd', (node: BinaryNode) => { })
sock.ws.on('CB:edge_routing,id:abcd,routing_info', (node: BinaryNode) => { })
```

# License

Copyright (c) 2025 Rajeh Taher/WhiskeySockets

Licensed under the MIT License. See [LICENSE](LICENSE) for full details.

# 🙏 Credits

- **Original author**: [whiskeysockets/baileys](https://github.com/whiskeysockets/baileys) & all contributors
- **Fork & modifications**: [lynovratech](https://github.com/ahcmaddevan)

---

<div align='center'>

**Powered by Lynovra Technology Solutions**

[![NPM](https://img.shields.io/badge/npm-%40lynovratech%2Fbaileys-red)](https://www.npmjs.com/package/@lynovratech/baileys)

</div>
