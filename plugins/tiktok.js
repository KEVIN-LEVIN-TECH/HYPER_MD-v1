const { cmd } = require('../command');
const axios = require('axios');

cmd({
    pattern: "tiktok",
    react: "🎶",
    desc: "Download videos from TikTok with multiple options",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, reply }) => {
    try {
        if (!q) {
            return reply("❌ Please provide the TikTok video URL.");
        }

        const tiktokUrl = q;

        // Use TikTok's video downloading service or API to get the video URL
        const response = await axios.get(`https://api.tiktokvideodownloader.com/api/v1/${tiktokUrl}`);
        const videoUrl = response.data.videoUrl;
        const audioUrl = response.data.audioUrl;
        const videoWithoutWatermarkUrl = response.data.videoUrlWithoutWatermark; // Assuming the API returns this

        if (!videoUrl) {
            return reply("❌ Could not find the video on TikTok.");
        }

        const tiktokDesc = `
╭──❮ TikTok Video Download ❯────
│
│➤ Video: ${tiktokUrl}
│➤ Link: ${videoUrl}
│
╰───────────────────

🔢 Reply Below Number

1 | Download Video with Watermark
2 | Download Video without Watermark
3 | Download Audio Only

©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ 
`;

        const vv = await conn.sendMessage(from, { caption: tiktokDesc }, { quoted: mek });

        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === vv.key.id) {
                switch (selectedOption) {
                    case '1':
                        // Send the TikTok video with watermark
                        await conn.sendMessage(from, { video: { url: videoUrl }, caption: 'ʜʏᴘᴇʀ-ᴍᴅ ᴡɪᴛʜ ᴡᴀᴛᴇʀᴍᴀʀᴋ ᴛɪᴋᴛᴏᴋ ᴅᴏᴡɴʟᴏᴀᴅ ꜱᴜᴄᴄᴇꜱꜱꜰᴜʟ.' }, { quoted: mek });
                        break;
                    case '2':
                        // Send the TikTok video without watermark
                        if (!videoWithoutWatermarkUrl) {
                            return reply("❌ Unable to fetch video without watermark.");
                        }
                        await conn.sendMessage(from, { video: { url: videoWithoutWatermarkUrl }, caption: 'ʜʏᴘᴇʀ-ᴍᴅ ᴡɪᴛʜᴏᴜᴛ ᴡᴀᴛᴇʀᴍᴀʀᴋ ᴛɪᴋᴛᴏᴋ ᴅᴏᴡɴʟᴏᴀᴅ ꜱᴜᴄᴄᴇꜱꜱꜰᴜʟ.'' }, { quoted: mek });
                        break;
                    case '3':
                        // Send the TikTok audio
                        if (!audioUrl) {
                            return reply("❌ Unable to fetch audio.");
                        }
                        await conn.sendMessage(from, { audio: { url: audioUrl }, caption: 'ʜʏᴘᴇʀ-ᴍᴅ ᴛɪᴋᴛᴏᴋ ᴀᴜᴅɪᴏ ᴅᴏᴡɴʟᴏᴀᴅ ꜱᴜᴄᴄᴇꜱꜱꜰᴜʟ.' }, { quoted: mek });
                        break;
                    default:
                        reply("❌ Invalid option. Please select a valid option🔴");
                }
            }
        });
    } catch (e) {
        console.error(e);
        reply("❌ An error occurred while processing your request.");
    }
}); 
