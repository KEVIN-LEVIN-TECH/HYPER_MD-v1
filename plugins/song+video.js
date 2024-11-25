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

        // Search for the song using yts
        const search = await yts(q);
        const data = search.videos[0];
        if (!data) return reply("No results found for your query. Please try again.");

        const url = data.url;

        let desc = `
🎶 HYPER-MD SONG DOWNLOADER 🎶

| ➤ ‎Title: ${data.title}

| ➤ Duration: ${data.timestamp}

| ➤ Uploaded: ${data.ago}

| ➤ Views: ${data.views}

| ➤ Author: ${data.author.name}

| ➤ URL: ${data.url}

🔢 Reply Below Number

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
                        await conn.sendMessage(from, { audio: { url:downloadUrl }, caption: '©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ ', mimetype: 'audio/mpeg'},{ quoted: mek });
                        break;
                    case '2':               
                        // Send Document File
                        let downdoc = await fg.yta(url);
                        let downloaddocUrl = downdoc.dl_url;
                        await conn.sendMessage(from, { document: { url:downloaddocUrl }, caption: '©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ ', mimetype: 'audio/mpeg', fileName:data.title + ".mp3"}, { quoted: mek });
                        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } })
                        break;
                    default:
                        reply("Invalid option. Please select a valid option🔴");
                }

            }
        });

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
        reply('An error occurred while processing your request.');
    }
});


// ============ VIDEO DOWNLOAD COMMAND ============
cmd({
    pattern: "video",
    react: "📽️",
    desc: "Download videos",
    category: "download",
    filename: __filename,
}, 
async (conn, mek, m, {
    from, quoted, body, isCmd, command, args, q, reply
}) => {
    try {
        if (!q) return reply("Please provide a URL or title to download the video.");

        // Search for the video using yts
        const search = await yts(q);
        const data = search.videos[0];
        if (!data) return reply("No results found for your query. Please try again.");

        const url = data.url;

        let desc = `
🎬 HYPER-MD VIDEO DOWNLOADER 🎬

| ➤ ‎Title: ${data.title}

| ➤ Duration: ${data.timestamp}

| ➤ Uploaded: ${data.ago}

| ➤ Views: ${data.views}

| ➤ Author: ${data.author.name}

| ➤ URL: ${data.url}

🔢 Reply Below Number

1 || Video Type
2 || Document Type

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
                switch (selectedOption) {
                    case '1': {
                        // Download video as a file
                        const down = await fg.ytv(url);
                        const downloadUrl = down.dl_url;
                        if (!downloadUrl) return reply("Failed to fetch the video file. Please try again.");

                        await conn.sendMessage(from, { 
                            video: { url: downloadUrl },
                            mimetype: "video/mp4",
                            caption: "©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ ",
                        }, { quoted: mek });
                        break;
                    }
                    case '2': {
                        // Download video as a document
                        const downDoc = await fg.ytv(url);
                        const downloadDocUrl = downDoc.dl_url;
                        if (!downloadDocUrl) return reply("Failed to fetch the video document. Please try again.");

                        await conn.sendMessage(from, { 
                            document: { url: downloadDocUrl },
                            mimetype: "video/mp4",
                            fileName: `${data.title}.mp4`,
                            caption: "©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ ",
                        }, { quoted: mek });

                        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
                        break;
                    }
                    default:
                        reply("Invalid option. Please select a valid option 🔴");
                }
            }
        });

    } catch (e) {
        console.error(e);
        // Handle errors
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        reply('An error occurred while processing your request.');
    }
});
