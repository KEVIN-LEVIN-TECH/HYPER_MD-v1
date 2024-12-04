const { cmd, commands } = require('../command');
const fg = require('api-dylux');
const yts = require('yt-search');
const config = require('../config');

// ============ SONG DOWNLOAD COMMAND ============
cmd({
    pattern: "song",
    react: "🎶",
    desc: "Download songs",
    category: "download",
    filename: __filename,
}, 
async (conn, mek, m, {
    from, quoted, body, isCmd, command, args, q, reply
}) => {
    try {
        if (!q) return reply("Please provide a URL or title to download the song.");

        const search = await yts(q);
        const data = search.videos[0];
        if (!data) return reply("No results found for your query. Please try again.");

        const url = data.url;

        let desc = `
🎶 HYPER-MD SONG DOWNLOADER 🎶

| ➤ Title: ${data.title}
| ➤ Duration: ${data.timestamp}
| ➤ Uploaded: ${data.ago}
| ➤ Views: ${data.views}
| ➤ Author: ${data.author.name}
| ➤ URL: ${data.url}

🔢 Reply Below Number:

1 || Audio Type
2 || Document Type

©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ
`;
        const vv = await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek });

        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === vv.key.id) {
                switch (selectedOption) {
                    case '1':
                        let down = await fg.yta(url);
                        let downloadUrl = down.dl_url;
                        await conn.sendMessage(from, { audio: { url: downloadUrl }, caption: 'Audio sent successfully ✅\n\n©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ ', mimetype: 'audio/mpeg' }, { quoted: mek });
                        break;
                    case '2':
                        let downdoc = await fg.yta(url);
                        let downloaddocUrl = downdoc.dl_url;
                        await conn.sendMessage(from, { document: { url: downloaddocUrl }, caption: 'Document sent successfully ✅\n\n©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ ', mimetype: 'audio/mpeg', fileName: data.title + ".mp3" }, { quoted: mek });
                        break;
                    default:
                        reply("Invalid option. Please select a valid option 🔴");
                }
            }
        });

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        reply('An error occurred while processing your request.');
    }
});

// ============ VIDEO DOWNLOAD COMMAND ============
cmd({
    pattern: 'video',
    desc: 'Download videos',
    react: "📽️",
    category: 'download',
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, reply }) => {
    try {
        if (!q) return reply('Please enter a query or a URL!');

        const search = await yts(q);
        const data = search.videos[0];
        if (!data) return reply("No results found for your query. Please try again.");

        const url = data.url;

        let desc = `📽️ HYPER-MD VIDEO DOWNLOADER 📽️

| ➤ Title: ${data.title}
| ➤ Views: ${data.views}
| ➤ Description: ${data.description}
| ➤ Time: ${data.timestamp}
| ➤ Ago: ${data.ago}

🔢 Reply Below Number:

1 || Video in Normal Format
2 || Video in Document Format

©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ 
`;

        const vv = await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek });

        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === vv.key.id) {
                switch (selectedOption) {
                    case '1':
                        let downvid = await fg.ytv(url);
                        let downloadvUrl = downvid.dl_url;
                        await conn.sendMessage(from, { video: { url: downloadvUrl }, caption: 'Video sent successfully ✅\n\n©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ ', mimetype: 'video/mp4' }, { quoted: mek });
                        break;
                    case '2':
                        let downviddoc = await fg.ytv(url);
                        let downloadvdocUrl = downviddoc.dl_url;
                        await conn.sendMessage(from, { document: { url: downloadvdocUrl }, caption: 'Document sent successfully ✅\n\n©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ ', mimetype: 'video/mp4', fileName: data.title + ".mp4" }, { quoted: mek });
                        break;
                    default:
                        reply("Invalid option. Please select a valid option 🔴");
                }
            }
        });

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        reply('An error occurred while processing your request.');
    }
});
