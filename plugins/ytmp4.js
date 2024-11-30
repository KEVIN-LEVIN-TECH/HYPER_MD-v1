const { cmd } = require('../command');
const axios = require('axios');

cmd({
    pattern: "ytmp4",
    desc: "Download YouTube video in specific quality",
    use: ".ytmp4 <url>",
    react: "🎬",
    category: "download",
    filename: __filename,
}, async (conn, mek, m, { from, quoted, args, reply }) => {
    const url = args[0];
    if (!url) return reply("❌ Please provide a valid YouTube URL.");

    try {
        // Fetch video details
        const response = await axios.get(`https://www.dark-yasiya-api.site/download/ytmp4?url=https://youtube.com/watch?v=AFqtArWpv-w`);
        const data = response.data;

        if (!data || !data.thumbnail || !data.formats) {
            return reply("❌ Failed to fetch video details. Please try again.");
        }

        // Show quality options to the user
        const desc = `
🎬 YouTube Video Downloader 🎬

📌 Title: ${data.title}

📥 Select a Quality

╭─❮ VIDEO QUALITY ❯────◈
│1.1 || 320p 
│1.2 || 720p 
│1.3 || 1080p 
╰──────────────────◈
╭─❮ DOCUMENT QUALITY ❯──◈
│2.1 || 360p 
│2.2 || 720p 
│2.3 || 1080p 
╰──────────────────◈

©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ
`;
        const vv = await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek });

        // Wait for user response
        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            // Validate the user response
            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === vv.key.id) {
                let quality;
                let fileType;

                switch (selectedOption) {
                    // Video Type Quality
                    case '1.1': quality = '360p'; fileType = 'video'; break;
                    case '1.2': quality = '720p'; fileType = 'video'; break;
                    case '1.3': quality = '1080p'; fileType = 'video'; break;

                    // Document Type Quality
                    
                    case '2.1': quality = '360p'; fileType = 'document'; break;       
                    case '2.2': quality = '720p'; fileType = 'document'; break;
                    case '2.3': quality = '1080p'; fileType = 'document'; break;

                    default:
                        reply("Invalid option. Please select a valid option 🔴");
                        return;
                }

                // Filter formats for the selected quality
                const selectedFormat = data.formats.find(format => format.quality === quality);

                if (!selectedFormat || !selectedFormat.url) {
                    return reply("Failed to fetch the video file. Please try again.");
                }

                const downloadUrl = selectedFormat.url;

                if (fileType === 'video') {
                    await conn.sendMessage(from, { 
                        video: { url: downloadUrl },
                        mimetype: "video/mp4",
                        caption: `🎬 Downloaded in ${quality}\n©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ`,
                    }, { quoted: mek });
                } else if (fileType === 'document') {
                    await conn.sendMessage(from, { 
                        document: { url: downloadUrl },
                        mimetype: "video/mp4",
                        fileName: `${data.title} (${quality}).mp4`,
                        caption: `🎬 Downloaded in ${quality}\n©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ`,
                    }, { quoted: mek });
                }

                await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
            }
        });
    } catch (e) {
        console.error(e);
        // Handle errors
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        reply('An error occurred while processing your request.');
    }
});
