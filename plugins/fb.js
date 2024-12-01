const { cmd } = require('../command');
const fbDownloader = require('fb-downloader'); // Import the fb-downloader package

cmd({
    pattern: "fb",
    desc: "Download Facebook video",
    category: "download",
    filename: __filename,
}, async (conn, mek, m, { from, reply, args }) => {
    if (args.length === 0) {
        return reply("❌ Please provide a valid Facebook video URL.");
    }

    const url = args[0];
    reply("⏳ Fetching video details...");

    try {
        // Use the fb-downloader package to fetch the video
        const videoDetails = await fbDownloader(url);

        if (videoDetails && videoDetails.url) {
            // Send the video file to the user
            await conn.sendMessage(
                from,
                { video: { url: videoDetails.url }, caption: "✅ Here is your Facebook video.\n\n©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ " },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to fetch video details. Please ensure the URL is correct.");
        }
    } catch (error) {
        console.error("Error fetching video:", error);
        reply("❌ Failed to fetch video details. Please try again later!");
    }
});
