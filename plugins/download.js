const { fetchJson } = require('../lib/functions');
const { cmd } = require('../command');

// Facebook Video Downloader
cmd({
    pattern: "fb",
    alias: ["facebook"],
    desc: "Download Facebook videos",
    category: "download",
    react: "⬇️",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, command, args, q, reply }) => {
    try {
        if (!q || !q.startsWith("https://")) return reply("❌ Please provide a valid Facebook video URL!");
        const data = await fetchJson(`<FB_API_URL>?url=${q}`); // Replace with your Facebook API
        reply("Downloading...");
        await conn.sendMessage(from, { video: { url: data.hd }, caption: "HD Video" }, { quoted: mek });
        await conn.sendMessage(from, { video: { url: data.sd }, caption: "SD Video" }, { quoted: mek });
    } catch (e) {
        console.error(e);
        reply("❌ Failed to download the Facebook video.");
    }
});

// TikTok Video Downloader
cmd({
    pattern: "tiktok",
    alias: ["tt"],
    desc: "Download TikTok videos",
    category: "download",
    react: "⬇️",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, command, args, q, reply }) => {
    try {
        if (!q || !q.startsWith("https://")) return reply("❌ Please provide a valid TikTok video URL!");
        const data = await fetchJson(`<TIKTOK_API_URL>?url=${q}`); // Replace with your TikTok API
        reply("Downloading...");
        await conn.sendMessage(from, { video: { url: data.no_watermark }, caption: "No Watermark" }, { quoted: mek });
        await conn.sendMessage(from, { video: { url: data.watermark }, caption: "With Watermark" }, { quoted: mek });
        await conn.sendMessage(from, { audio: { url: data.audio }, mimetype: "audio/mpeg", caption: "Audio File" }, { quoted: mek });
    } catch (e) {
        console.error(e);
        reply("❌ Failed to download the TikTok video.");
    }
});

// Twitter Video Downloader
cmd({
    pattern: "twitter",
    alias: ["twdl"],
    desc: "Download Twitter videos",
    category: "download",
    react: "⬇️",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, command, args, q, reply }) => {
    try {
        if (!q || !q.startsWith("https://")) return reply("❌ Please provide a valid Twitter video URL!");
        const data = await fetchJson(`<TWITTER_API_URL>?url=${q}`); // Replace with your Twitter API
        reply("Downloading...");
        await conn.sendMessage(from, { video: { url: data.hd }, caption: "HD Video" }, { quoted: mek });
        await conn.sendMessage(from, { video: { url: data.sd }, caption: "SD Video" }, { quoted: mek });
        await conn.sendMessage(from, { audio: { url: data.audio }, mimetype: "audio/mpeg", caption: "Audio File" }, { quoted: mek });
    } catch (e) {
        console.error(e);
        reply("❌ Failed to download the Twitter video.");
    }
});

// Google Drive Downloader
cmd({
    pattern: "gdrive",
    alias: ["googledrive"],
    desc: "Download Google Drive files",
    category: "download",
    react: "⬇️",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, command, args, q, reply }) => {
    try {
        if (!q || !q.startsWith("https://")) return reply("❌ Please provide a valid Google Drive URL!");
        const data = await fetchJson(`<GDRIVE_API_URL>?url=${q}`); // Replace with your Google Drive API
        reply("Downloading...");
        await conn.sendMessage(from, { document: { url: data.download }, fileName: data.fileName, caption: data.fileName }, { quoted: mek });
    } catch (e) {
        console.error(e);
        reply("❌ Failed to download the Google Drive file.");
    }
});

// MediaFire Downloader
cmd({
    pattern: "mediafire",
    alias: ["mfire"],
    desc: "Download MediaFire files",
    category: "download",
    react: "⬇️",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, command, args, q, reply }) => {
    try {
        if (!q || !q.startsWith("https://")) return reply("❌ Please provide a valid MediaFire URL!");
        const data = await fetchJson(`<MEDIAFIRE_API_URL>?url=${q}`); // Replace with your MediaFire API
        reply("Downloading...");
        await conn.sendMessage(from, { document: { url: data.link }, fileName: data.fileName, caption: data.fileName }, { quoted: mek });
    } catch (e) {
        console.error(e);
        reply("❌ Failed to download the MediaFire file.");
    }
});
