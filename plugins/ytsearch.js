const { cmd } = require('../command');
const yts = require('yt-search'); // YouTube search library
const fg = require('ytdl-core'); // For downloading videos

cmd({
    pattern: "ytsearch",
    react: "🔍",
    desc: "Search and download YouTube videos",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, reply }) => {
    try {
        if (!q) return reply("❌ Please provide a search term.\nExample: .ytsearch relaxing music");

        // Search for YouTube videos
        const search = await yts(q);
        const data = search.videos[0];
        if (!data) return reply("❌ No results found for your query. Please try again.");

        const url = data.url;

        let desc = `
🎶 HYPER-MD YOUTUBE VIDEO DOWNLOADER 🎶

| ➤ Title: ${data.title}

| ➤ Duration: ${data.timestamp}

| ➤ Uploaded: ${data.ago}

| ➤ Views: ${data.views}

| ➤ Author: ${data.author.name}

| ➤ URL: ${data.url}

🔢 Reply Below Number

1️ | Audio Type (MP3)
2️ | Document Type (MP4)

©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ 
`;

        const vv = await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek });

        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === vv.key.id) {
                switch (selectedOption) {
                    case '1': // Audio type
                        let audioDownload = await fg.yta(url);
                        let audioUrl = audioDownload.dl_url;
                        await conn.sendMessage(from, { audio: { url: audioUrl }, caption: '©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ ', mimetype: 'audio/mpeg' }, { quoted: mek });
                        break;

                    case '2': // Document type (Video)
                        let videoDownload = await fg.ytv(url);
                        let videoUrl = videoDownload.dl_url;
                        await conn.sendMessage(from, { document: { url: videoUrl }, caption: '©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ ', mimetype: 'video/mp4', fileName: `${data.title}.mp4` }, { quoted: mek });
                        break;

                    default:
                        reply("❌ Invalid option. Please select a valid number (1 or 2).");
                }
            }
        });

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        reply('❌ An error occurred while processing your request.');
    }
});
