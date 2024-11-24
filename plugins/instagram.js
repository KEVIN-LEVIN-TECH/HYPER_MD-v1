const { cmd } = require('../command');
const axios = require('axios');

cmd({
    pattern: "instagram",
    react: "📸",
    desc: "Download Instagram videos in HD, SD, or Audio",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, reply }) => {
    try {
        if (!q) {
            return reply("❌ Please provide the Instagram post URL.\nExample: .instagram https://www.instagram.com/p/xyz/");
        }

        const instagramUrl = q;

        // Use an API or service that fetches Instagram video/audio URLs
        const response = await axios.get(`https://api.instagramvideodownloader.com/download?url=${instagramUrl}`);

        if (!response || !response.data || !response.data.url) {
            return reply("❌ Could not fetch the media from Instagram. Please ensure the URL is correct.");
        }

        const mediaType = response.data.type; // Type: "video" or "image"
        const videoUrlHD = response.data.hd_url; // HD video URL
        const videoUrlSD = response.data.sd_url; // SD video URL
        const audioUrl = response.data.audio_url; // Audio URL (if available)
        const mediaTitle = response.data.title; // Title of the media
        const mediaThumbnail = response.data.thumbnail; // Thumbnail image if available

        let infoMessage = `

╭──❮ Instagram Media Download ❯──
│
│ ➤ Title: ${mediaTitle}
│ ➤ Type: ${mediaType === 'video' ? 'Video' : 'Image'}
│ ➤ URL: ${instagramUrl}
│
╰──────────────────
🔢 Reply Below Number

1 | Download HD Video
2 | Download SD Video
3 | Download Audio

©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ 
`;

        // Send the thumbnail and info message
        const vv = await conn.sendMessage(from, {
            image: { url: mediaThumbnail },
            caption: infoMessage
        }, { quoted: mek });

        // Wait for user to reply with the option
        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === vv.key.id) {
                switch (selectedOption) {
                    case '1': // HD Video
                        if (videoUrlHD) {
                            await conn.sendMessage(from, { video: { url: videoUrlHD }, caption: `ʜʏᴘᴇʀ-ᴍᴅ ʜᴅ ᴠɪᴅᴇᴏ ᴅᴏᴡɴʟᴏᴀᴅ ꜱᴜᴄᴄᴇꜱꜱꜰᴜʟ.` }, { quoted: mek });
                        } else {
                            return reply("❌ HD video not available.");
                        }
                        break;
                    case '2': // SD Video
                        if (videoUrlSD) {
                            await conn.sendMessage(from, { video: { url: videoUrlSD }, caption: `ʜʏᴘᴇʀ-ᴍᴅ ꜱᴅ ᴠɪᴅᴇᴏ ᴅᴏᴡɴʟᴏᴀᴅ ꜱᴜᴄᴄᴇꜱꜱꜰᴜʟ.` }, { quoted: mek });
                        } else {
                            return reply("❌ SD video not available.");
                        }
                        break;
                    case '3': // Audio
                        if (audioUrl) {
                            await conn.sendMessage(from, { audio: { url: audioUrl }, caption: `ʜʏᴘᴇʀ-ᴍᴅ ᴀᴜᴅɪᴏ ꜰɪʟᴇ ᴅᴏᴡɴʟᴏᴀᴅ ꜱᴜᴄᴄᴇꜱꜱꜰᴜʟ.` }, { quoted: mek });
                        } else {
                            return reply("❌ Audio not available.");
                        }
                        break;
                    default:
                        reply("❌ Invalid option. Please select a valid option.");
                }
            }
        });
    } catch (e) {
        console.error(e);
        reply("❌ An error occurred while processing your request.");
    }
});
