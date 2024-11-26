const { cmd } = require('../command');
const axios = require('axios');

cmd({
    pattern: "tiktok",
    react: "🎶",
    desc: "Download videos from TikTok with multiple options",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, q, reply }) => {
    try {
        if (!q) {
            return reply("❌ Please provide the TikTok video URL.");
        }

        const tiktokUrl = q.trim();

        // TikTok API call to fetch video details
        const apiKey = "YOUR_API_KEY"; // Replace with your actual API key
        const apiEndpoint = `https://api.tiktokdownloader.org/v1/video?url=${encodeURIComponent(tiktokUrl)}&key=${apiKey}`;

        const response = await axios.get(apiEndpoint);

        if (response.data.status !== "success") {
            return reply("❌ Unable to fetch TikTok video details. Please check the URL or try again.");
        }

        const { video_with_watermark, video_without_watermark, audio } = response.data.data;

        const tiktokDesc = `
╭──❮ TikTok Video Download ❯────
│
│➤ Video: ${tiktokUrl}
│
╰───────────────────

🔢 Reply Below Number:

1 | Download Video with Watermark
2 | Download Video without Watermark
3 | Download Audio Only

©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ 
`;

        const sentMessage = await conn.sendMessage(from, { text: tiktokDesc }, { quoted: mek });

        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === sentMessage.key.id) {
                switch (selectedOption) {
                    case '1':
                        // Send the TikTok video with watermark
                        await conn.sendMessage(
                            from,
                            { video: { url: video_with_watermark }, caption: '✅ TikTok video with watermark downloaded successfully.\n\n©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ ' },
                            { quoted: mek }
                        );
                        break;
                    case '2':
                        // Send the TikTok video without watermark
                        if (!video_without_watermark) {
                            return reply("❌ Unable to fetch video without watermark.");
                        }
                        await conn.sendMessage(
                            from,
                            { video: { url: video_without_watermark }, caption: '✅ TikTok video without watermark downloaded successfully.\n\n©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ ' },
                            { quoted: mek }
                        );
                        break;
                    case '3':
                        // Send the TikTok audio
                        if (!audio) {
                            return reply("❌ Unable to fetch audio.");
                        }
                        await conn.sendMessage(
                            from,
                            { audio: { url: audio }, mimetype: "audio/mpeg", caption: '✅ TikTok audio downloaded successfully.\n\n©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ ' },
                            { quoted: mek }
                        );
                        break;
                    default:
                        reply("❌ Invalid option. Please reply with 1, 2, or 3.");
                }
            }
        });
    } catch (error) {
        console.error(error);
        reply("❌ An error occurred while processing your request. Please try again later.");
    }
});
