const { cmd } = require('../command');
const axios = require('axios');

cmd({
    pattern: "fb",
    react: "📱",
    desc: "Download Facebook videos using a secure API",
    category: "download",
    filename: __filename,
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) {
            return reply("❌ Please provide a Facebook video URL.\nExample: .fb https://facebook.com/video_url");
        }

        const videoUrl = q.trim();

        // Replace with your RapidAPI Key
        const apiKey = 'YOUR_RAPIDAPI_KEY_HERE';
        const apiEndpoint = `https://getvideo.p.rapidapi.com/?url=${encodeURIComponent(videoUrl)}`;

        // API Request headers
        const headers = {
            'x-rapidapi-host': 'getvideo.p.rapidapi.com',
            'x-rapidapi-key': apiKey,
        };

        // Make API call
        const response = await axios.get(apiEndpoint, { headers });

        if (!response.data || !response.data.success || !response.data.links) {
            return reply("❌ Unable to fetch video details. Please check the link and try again.");
        }

        const { title, thumbnail, links } = response.data;
        const hdUrl = links.find(link => link.quality === 'hd')?.url;
        const sdUrl = links.find(link => link.quality === 'sd')?.url;

        if (!hdUrl && !sdUrl) {
            return reply("❌ No downloadable content found for this video.");
        }

        // Video options message
        let infoMessage = `
╭──❮ Facebook Video Download ❯──────
│
│ ➤ Title: ${title || "Unknown"}
│ ➤ HD Quality: ${hdUrl ? "Available" : "Not Available"}
│ ➤ SD Quality: ${sdUrl ? "Available" : "Not Available"}
│
╰────────────────────────

🔢 Reply Below Number

1️ | Download HD Video
2️ | Download SD Video

©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ 
`;

        const sentMessage = await conn.sendMessage(from, {
            image: { url: thumbnail },
            caption: infoMessage,
        }, { quoted: mek });

        // Handle user response
        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === sentMessage.key.id) {
                switch (selectedOption) {
                    case '1': // Download HD Video
                        if (!hdUrl) {
                            return reply("❌ HD video is not available for this link.");
                        }
                        await conn.sendMessage(from, { video: { url: hdUrl }, caption: `🎥 Downloading ${title} in HD quality.\n\n©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ ` }, { quoted: mek });
                        break;

                    case '2': // Download SD Video
                        if (!sdUrl) {
                            return reply("❌ SD video is not available for this link.");
                        }
                        await conn.sendMessage(from, { video: { url: sdUrl }, caption: `🎥 Downloading ${title} in SD quality.\n\n©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ ` }, { quoted: mek });
                        break;

                    default:
                        reply("❌ Invalid option. Please select a valid option.");
                }
            }
        });
    } catch (error) {
        console.error(error);
        reply("❌ An error occurred while processing your request.");
    }
});
