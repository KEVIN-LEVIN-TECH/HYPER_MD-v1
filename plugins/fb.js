const { cmd } = require('../command');
const { facebookdl } = require('@bochilteam/scraper'); // Import facebook downloader from bochilteam package

cmd({
    pattern: "fb",
    desc: "Download Facebook video",
    react: "🌐",
    category: "download",
    filename: __filename,
}, async (conn, mek, m, { from, reply, args }) => {
    if (args.length === 0 || !args[0].startsWith("http")) {
        return reply("❌ Please provide a valid Facebook video URL.");
    }

    const url = args[0];
    reply("⏳ Fetching video details...");

    try {
        // Fetch video details using bochilteam's facebook downloader
        const videoDetails = await facebookdl(url);
        if (videoDetails.video) {
            const { url: videoUrl, isHd } = videoDetails.video[0]; // Get the first video URL
            const quality = isHd ? "HD" : "SD";

            // Send the video to the user
            await conn.sendMessage(
                from,
                {
                    video: { url: videoUrl },
                    caption: `✅ Here is your Facebook video (${quality} Quality).\n\n©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ`,
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to fetch video details. Please ensure the provided URL is correct.");
        }
    } catch (error) {
        console.error("Error fetching video:", error);
        reply("❌ Error fetching video details. Please try again later!");
    }
});
