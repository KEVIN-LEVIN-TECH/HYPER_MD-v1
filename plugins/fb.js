const { cmd } = require('../command');
const axios = require('axios');
const { getBuffer, isUrl } = require('./utils'); // Import helper functions from utils.js

cmd({
    pattern: "fb",
    desc: "Download Facebook video",
    react: "🌐",
    category: "download",
    filename: __filename,
}, async (conn, mek, m, { from, reply, args }) => {
    if (args.length === 0 || !isUrl(args[0])) {
        return reply("❌ Please provide a valid Facebook video URL.");
    }

    const url = args[0];
    reply("⏳ Fetching video details...");

    try {
        // Use axios to fetch video data from a Facebook downloader API
        const apiUrl = `https://fbdownloader.online/api?url=${encodeURIComponent(url)}`;
        const response = await axios.get(apiUrl);

        if (response.data && response.data.success) {
            const videoUrl = response.data.download_url;
            if (!videoUrl) {
                return reply("❌ Video URL not found. Please check the link or try again later.");
            }

            // Send the video file to the user
            await conn.sendMessage(
                from,
                { video: { url: videoUrl }, caption: "✅ Here is your Facebook video.\n\n©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ" },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to fetch video details. Ensure the provided URL is correct.");
        }
    } catch (error) {
        console.error("Error fetching video:", error);
        reply("❌ Error fetching video details. Please try again later!");
    }
});
