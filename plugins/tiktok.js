const { fetchJson } = require('../lib/functions');
const config = require('../config');
const { cmd, commands } = require('../command');

// FETCH API URL
let baseUrl;
(async () => {
    let baseUrlGet = await fetchJson(`https://www.dark-yasiya-api.site/download/tiktok?url=https://vt.tiktok.com/ZSje1Vkup/`);
    baseUrl = baseUrlGet.api;
})();

// TikTok Downloader Command
cmd({
    pattern: "tiktok",
    alias: ["tt"],
    desc: "Download TikTok videos",
    category: "download",
    react: "🔎",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, reply }) => {
    try {
        if (!q || !q.startsWith("https://")) {
            return reply("Please provide a valid TikTok video URL!");
        }

        // Fetch TikTok video details
        const data = await fetchJson(`${baseUrl}/api/tiktokdl?url=${q}`);
        if (!data || !data.data) return reply("Failed to fetch video details. Please check the URL.");

        // Create message description
        const desc = `
🎬 TikTok Downloader 🎬

Reply to this message with an option

1 || Download Video With Watermark
2 || Download Video Without Watermark
3 || Download Audio

> ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ 
`;

        // Send thumbnail image with options
        const vv = await conn.sendMessage(from, {
            image: { url: data.data.thumb },
            caption: desc,
        }, { quoted: mek });

        // Listen for user reply
        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            // Check if the reply is for the previously sent message
            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === vv.key.id) {
                switch (selectedOption) {
                    case '1':
                        await conn.sendMessage(from, {
                            video: { url: data.data.wm },
                            mimetype: "video/mp4",
                            caption: "✅ Video with Watermark\n©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ",
                        }, { quoted: mek });
                        break;
                    case '2':
                        await conn.sendMessage(from, {
                            video: { url: data.data.no_wm },
                            mimetype: "video/mp4",
                            caption: "✅ Video without Watermark\n©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ",
                        }, { quoted: mek });
                        break;
                    case '3':
                        await conn.sendMessage(from, {
                            audio: { url: data.data.audio },
                            mimetype: "audio/mpeg",
                        }, { quoted: mek });
                        break;
                    default:
                        reply("Invalid option. Please select a valid option 🔴");
                }
            }
        });
    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        reply('An error occurred while processing your request.');
    }
});
