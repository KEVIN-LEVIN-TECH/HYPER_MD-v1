const { cmd } = require('../command');
const axios = require('axios');

cmd({
    pattern: "twitter",
    react: "🐦",
    desc: "Download videos from Twitter with HD and SD options",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, reply }) => {
    try {
        if (!q) {
            return reply("❌ Please provide the Twitter video URL.");
        }

        const twitterUrl = q;

        // Use a service or API to fetch Twitter video URLs (HD and SD)
        const response = await axios.get(`https://api.twittervideodownloader.com/api/v1/${twitterUrl}`);
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

        const vv = await conn.sendMessage(from, { caption: twitterDesc }, { quoted: mek });

        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === vv.key.id) {
                switch (selectedOption) {
                    case '1':
                        // Send the HD video
                        if (!videoUrlHD) {
                            return reply("❌ HD video not available.");
                        }
                        await conn.sendMessage(from, { video: { url: videoUrlHD }, caption: 'ʜʏᴘᴇʀ-ᴍᴅ ʜᴅ ᴠɪᴅᴇᴏ ᴅᴏᴡɴʟᴏᴀᴅ ꜱᴜᴄᴄᴇꜱꜱꜰᴜʟ.' }, { quoted: mek });
                        break;
                    case '2':
                        // Send the SD video
                        if (!videoUrlSD) {
                            return reply("❌ SD video not available.");
                        }
                        await conn.sendMessage(from, { video: { url: videoUrlSD }, caption: 'ʜʏᴘᴇʀ-ᴍᴅ ꜱᴅ ᴠɪᴅᴇᴏ ᴅᴏᴡɴʟᴏᴀᴅ ꜱᴜᴄᴄᴇꜱꜱꜰᴜʟ.' }, { quoted: mek });
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
