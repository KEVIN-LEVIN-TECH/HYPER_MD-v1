const { eypz, commands } = require('../command');
const fg = require('api-dylux');
const yts = require('yt-search');
const config = require('../config');

cmd({
    pattern: "song",
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

©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ 
`;
        await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek });

        // Download audio
        const down = await fg.yta(url);
        if (!down || !down.dl_url) return reply("Failed to fetch the download link. Please try again.");

        const downloadUrl = down.dl_url;

        // Send audio
        await conn.sendMessage(from, { audio: { url: downloadUrl }, mimetype: "audio/mpeg" }, { quoted: mek });
        await conn.sendMessage(from, { 
            document: { url: downloadUrl }, 
            mimetype: "audio/mpeg", 
            fileName: `${data.title}.mp3`, 
            caption: "©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ",
        }, { quoted: mek });

    } catch (e) {
        console.error(e);
        reply(`Error: ${e.message}`);
    }
});

// ============= VIDEO DOWNLOAD COMMAND =============

cmd({
    pattern: "video",
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

©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ 
`;
        await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek });

        // Download video
        const down = await fg.ytv(url);
        if (!down || !down.dl_url) return reply("Failed to fetch the download link. Please try again.");

        const downloadUrl = down.dl_url;

        // Send video
        await conn.sendMessage(from, { video: { url: downloadUrl }, mimetype: "video/mp4" }, { quoted: mek });
        await conn.sendMessage(from, { 
            document: { url: downloadUrl }, 
            mimetype: "video/mp4", 
            fileName: `${data.title}.mp4`, 
            caption:  "©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ ",
        }, { quoted: mek });

    } catch (e) {
        console.error(e);
        reply(`Error: ${e.message}`);
    }
});
