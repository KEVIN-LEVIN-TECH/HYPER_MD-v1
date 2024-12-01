const { fetchJson } = require('../lib/functions')
const config = require('../config')
const { cmd, commands } = require('../command')

// FETCH API URL
let baseUrl;
(async () => {
    let baseUrlGet = await fetchJson(`https://api-pink-venom.vercel.app/api/tiktok?url=https://www.tiktok.com/@rockinrefreshments/video/7381832164662431019`)
    baseUrl = baseUrlGet.api
})();
//tiktok downloader
cmd({
    pattern: "tiktok",
    alias: ["tt"],
    desc: "Download tt videos",
    category: "download",
    react: "🔎",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q || !q.startsWith("https://")) return reply("Please provide a valid Tiktok video URL!");
        const data = await fetchJson(`${baseUrl}/api/tiktokdl?url=${q}`);
        let desc = ` HYPER-MD TikTok DOWNLOADER...⚙️

Reply This Message With Option

1 || Download TikTok Video With Watermark
2 || Download TikTok Video Without Watermark
3 || Download Audio

> ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ `;

        const vv = await conn.sendMessage(from, { image: { url: "https://files.catbox.moe/de82e3.jpg" }, caption: desc }, { quoted: mek });

        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === vv.key.id) {
                switch (selectedOption) {
                    case '1':
                        await conn.sendMessage(from, { video: { url: data.data.wm }, mimetype: "video/mp4", caption: "> ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ " }, { quoted: mek })  
                        break;
                    case '2':               
                    await conn.sendMessage(from, { video: { url: data.data.no_wm }, mimetype: "video/mp4", caption: "> ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ " }, { quoted: mek })
                        break;
                    case '3':               
                    await conn.sendMessage(from, { audio: { url: data.data.audio }, mimetype: "audio/mpeg" }, { quoted: mek })
                        break;
                    default:
                        reply("Invalid option. Please select a valid option🔴");
                }

            }
        });

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
        reply('An error occurred while processing your request.');
    }
});


