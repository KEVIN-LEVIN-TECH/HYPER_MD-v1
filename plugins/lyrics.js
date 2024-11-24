const { cmd } = require('../command');
const axios = require('axios'); // To make HTTP requests

cmd({
    pattern: "lyrics",
    react: "🎤",
    desc: "Search and download lyrics of a song",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, reply }) => {
    try {
        if (!q) {
            return reply("❌ Please provide a song name and artist.\nExample: .lyrics Shape of You Ed Sheeran");
        }

        // The format for Lyrics.ovh API is 'song-name/artist-name'
        const songQuery = q.replace(/\s+/g, '-').toLowerCase(); // Format input properly for API

        // Make the API request
        const response = await axios.get(`https://lyricsovh.eu/api/v1/${songQuery}`);
        const data = response.data;

        if (!data || !data.lyrics) {
            return reply("❌ Sorry, I couldn't find the lyrics for the song.");
        }

        // Extract the lyrics
        const lyrics = data.lyrics;
        const songDetails = `
🎤 Lyrics for: ${q}

${lyrics.slice(0, 1000)}...  (Show more lyrics in the full message)

🔢 Reply Below Number:

1️ | Download Lyrics as Text
2️ | View Lyrics

©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ 
`;

        // Send the preview of the lyrics and download options
        const vv = await conn.sendMessage(from, { image: { url: 'https://i.imgur.com/4jUL6Fl.jpg' }, caption: songDetails }, { quoted: mek });

        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === vv.key.id) {
                switch (selectedOption) {
                    case '1':
                        // Send the lyrics as a document
                        await conn.sendMessage(from, { document: { url: `data:text/plain;charset=utf-8,${encodeURIComponent(lyrics)}` }, caption: 'Here are the lyrics for your song.', fileName: `${q}.txt`, mimetype: 'text/plain' }, { quoted: mek });
                        break;
                    case '2':
                        // Send the lyrics directly as text
                        await conn.sendMessage(from, { text: `🎤 Lyrics for ${q}:\n\n${lyrics}` }, { quoted: mek });
                        break;
                    default:
                        reply("❌ Invalid option. Please reply with '1' to download or '2' to view lyrics.");
                }
            }
        });

    } catch (e) {
        console.error(e);
        reply("❌ An error occurred while fetching the lyrics.");
    }
});
