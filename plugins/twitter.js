const { cmd } = require('../command');
const axios = require('axios');

cmd({
    pattern: "twitter",
    react: "🐦",
    desc: "Download videos from Twitter with HD and SD options",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, q, reply }) => {
    try {
        if (!q) {
            return reply("❌ Please provide the Twitter video URL.");
        }

        const twitterUrl = q.trim();

        // Fetch video URLs using a Twitter video downloader API
        const apiKey = "YOUR_API_KEY"; // Replace with your actual API key
        const apiEndpoint = `https://api.twittervideodownloader.com/api/v1/?url=${encodeURIComponent(twitterUrl)}&key=${apiKey}`;

        const response = await axios.get(apiEndpoint);

        if (response.data.status !== "success") {
            return reply("❌ Unable to fetch video details. Please check the URL or try again.");
        }

        const { hd_url, sd_url } = response.data.data;

        if (!hd_url && !sd_url) {
            return reply("❌ Could not fetch the video from Twitter.");
        }

        const twitterDesc = `
╭──❮ Twitter Download ❯────
│
│ ➤ Video: ${twitterUrl}
│
╰──────────────────

🔢 Reply Below Number

1 | Download HD Video
2 | Download SD Video

©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ 
`;

        const sentMessage = await conn.sendMessage(from, { text: twitterDesc }, { quoted: mek });

        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === sentMessage.key.id) {
                switch (selectedOption) {
                    case '1':
                        // Send the HD video
                        if (!hd_url) {
                            return reply("❌ HD video not available.");
                        }
                        await conn.sendMessage(from, { video: { url: hd_url }, caption: '✅ HD video download successful.\n\n©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ ' }, { quoted: mek });
                        break;
                    case '2':
                        // Send the SD video
                        if (!sd_url) {
                            return reply("❌ SD video not available.");
                        }
                        await conn.sendMessage(from, { video: { url: sd_url }, caption: '✅ SD video download successful.\n\n©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ ' }, { quoted: mek });
                        break;
                    default:
                        reply("❌ Invalid option. Please select a valid option.");
                }
            }
        });
    } catch (error) {
        console.error(error.message || error);
        reply("❌ An error occurred while processing your request.");
    }
});
