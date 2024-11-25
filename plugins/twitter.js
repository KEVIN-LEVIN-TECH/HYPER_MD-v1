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

        const twitterUrl = q;

        // Fetch video URLs using an API
        const response = await axios.get(`https://api.twittervideodownloader.com/api/v1/${encodeURIComponent(twitterUrl)}`);
        const videoUrlHD = response.data.hd_url; // URL for HD video
        const videoUrlSD = response.data.sd_url; // URL for SD video

        if (!videoUrlHD && !videoUrlSD) {
            return reply("❌ Could not fetch the video from Twitter.");
        }

        const twitterDesc = `
╭──❮ Twitter Video Download ❯───
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
                        if (!videoUrlHD) {
                            return reply("❌ HD video not available.");
                        }
                        await conn.sendMessage(from, { video: { url: videoUrlHD }, caption: 'HD video download successful.' }, { quoted: mek });
                        break;
                    case '2':
                        // Send the SD video
                        if (!videoUrlSD) {
                            return reply("❌ SD video not available.");
                        }
                        await conn.sendMessage(from, { video: { url: videoUrlSD }, caption: 'SD video download successful.' }, { quoted: mek });
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
