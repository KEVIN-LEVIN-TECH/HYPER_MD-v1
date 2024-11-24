const { cmd } = require('../command');
const ytdl = require('ytdl-core'); // Used for video downloading
const fbDownloader = require('fb-video-downloader'); // Facebook video downloader module

cmd({
    pattern: "fb",
    react: "📱",
    desc: "Download Facebook videos in HD, SD or audio",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, reply }) => {
    try {
        if (!q) {
            return reply("❌ Please provide a Facebook video URL.\nExample: .fb https://facebook.com/video_url");
        }

        // Use the Facebook downloader to get the available formats
        const videoUrl = q;
        const data = await fbDownloader(videoUrl);

        if (!data || !data.data || !data.data.length) {
            return reply("❌ No video found. Please check the link and try again.");
        }

        // Get video details
        const video = data.data[0];
        const videoTitle = video.title;
        const videoThumbnail = video.thumbnail;
        const hdUrl = video.sd_url; // Assuming SD is the higher quality
        const sdUrl = video.sd_url; // For SD quality
        const audioUrl = video.audio_url; // Audio URL if available

        // Message to show video options
        let infoMessage = `
📥 Facebook Video Download Options

| ➤ Title: ${videoTitle}
| ➤ HD Quality: Available
| ➤ SD Quality: Available
| ➤ Audio Quality: Available

🔢 Reply Below Number

1️ | Download HD Video
2️ | Download SD Video
3️ | Download Audio

©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ 

`;

        // Send video details and download options
        const vv = await conn.sendMessage(from, {
            image: { url: videoThumbnail },
            caption: infoMessage
        }, { quoted: mek });

        // Wait for user to select the download option
        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === vv.key.id) {
                switch (selectedOption) {
                    case '1': // HD Video
                        await conn.sendMessage(from, { video: { url: hdUrl }, caption: `Downloading ${videoTitle} in HD quality.` }, { quoted: mek });
                        break;
                    case '2': // SD Video
                        await conn.sendMessage(from, { video: { url: sdUrl }, caption: `Downloading  ${videoTitle} in SD quality.` }, { quoted: mek });
                        break;
                    case '3': // Audio
                        await conn.sendMessage(from, { audio: { url: audioUrl }, caption: `Downloading  audio for ${videoTitle}.`, mimetype: 'audio/mpeg' }, { quoted: mek });
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
