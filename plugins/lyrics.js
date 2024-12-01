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
            return reply("❌ Please provide a song name.\nExample: .lyrics Love Me Like You Do");
        }

        // Encode the song name for the API request
        const query = encodeURIComponent(q);

        // Make the API request
        const apiUrl = `https://levanter.onrender.com/lyrics?name=${query}`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (!data || !data.lyrics) {
            return reply("❌ Sorry, I couldn't find the lyrics for the song.");
        }

        // Extract the lyrics and title
        const lyrics = data.lyrics;
        const title = data.title || q;

        // Prepare the contextInfo object
        const contextInfo = {
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterName: "HYPER-MD",
                newsletterJid: "120363325937635174@newsletter",
            },
            externalAdReply: {
                title: "HYPER-MD Alive",
                body: "©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ",
                thumbnailUrl: "https://telegra.ph/file/3c64b5608dd82d33dabe8.jpg",
                mediaType: 1,
                renderLargerThumbnail: true,
            },
        };

        // Send the lyrics as a document with the contextInfo
        await conn.sendMessage(
            from,
            {
                document: { url: `data:text/plain;charset=utf-8,${encodeURIComponent(lyrics)}` },
                caption: `🎤 Here are the lyrics for ${title}\n\n©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ`,
                fileName: `${title}.txt`,
                mimetype: 'text/plain',
                contextInfo: contextInfo,
            },
            { quoted: mek }
        );

    } catch (e) {
        console.error(e);
        reply("❌ An error occurred while fetching the lyrics.");
    }
});
