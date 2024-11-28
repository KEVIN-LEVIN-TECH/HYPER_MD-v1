const { fetchJson } = require('../lib/functions');
const { cmd } = require('../command');

// Fetch API URL dynamically
let baseUrl = 'https://api.dark-yasiya.site';

cmd({
    pattern: "fb",
    desc: "Download Facebook videos",
    category: "download",
    react: "🔎",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, args, q, reply }) => {
    try {
        // Validate input
        if (!q || !q.startsWith("https://")) {
            return reply("Please provide a valid Facebook video URL!");
        }

        // Fetch video data
        const apiEndpoint = `${baseUrl}/download/fbdl1?url=${q}`;
        const data = await fetchJson(apiEndpoint);

        // Check response validity
        if (!data || !data.data) {
            return reply("Failed to fetch video details. Please try again later!");
        }

        // Options for download
        const desc = `
📥 Facebook Video Downloader 📥

Reply This Message With Your Option

1️ || Download Video in HD
2️ || Download Video in SD

©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ 
        `;
        const msgOptions = await conn.sendMessage(from, { image: { url: "https://files.catbox.moe/de82e3.jpg" }, caption: desc }, { quoted: mek });

        // Handle option reply
        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();
            const contextInfo = msg.message.extendedTextMessage.contextInfo;

            if (contextInfo && contextInfo.stanzaId === msgOptions.key.id) {
                switch (selectedOption) {
                    case '1': // HD Video
                        await conn.sendMessage(from, { video: { url: data.data.hd }, mimetype: "video/mp4", caption: "✅ HD Video Downloaded Successful!\n\n©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ " }, { quoted: mek });
                        break;
                    case '2': // SD Video
                        await conn.sendMessage(from, { video: { url: data.data.sd }, mimetype: "video/mp4", caption: "✅ SD Video Downloaded Successful!\n\n©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ " }, { quoted: mek });
                        break;
                    default:
                        reply("Invalid option selected. Please try again!");
                }
            }
        });

    } catch (e) {
        console.error(e);
        reply("❌ An error occurred while processing your request.");
    }
});
