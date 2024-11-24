const { cmd } = require('../command');
const { createStickerFromUrl } = require('../utils/stickerUtils'); // Assuming you have a utility to create stickers

cmd({
    pattern: "sticker",
    react: "🖼️",
    desc: "Create a sticker from an image or video",
    category: "convert",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, reply }) => {
    try {
        // Check if there's a quoted message with an image/video
        if (quoted && quoted.message && quoted.message.imageMessage || quoted.message.videoMessage) {
            let media = quoted.message.imageMessage || quoted.message.videoMessage;
            let mediaUrl = await conn.downloadMediaMessage(quoted);

            // Create sticker
            const sticker = await createStickerFromUrl(mediaUrl);
            
            if (sticker) {
                await conn.sendMessage(from, { sticker: sticker }, { quoted: mek });
            } else {
                reply("❌ Sticker creation failed. Please try again.");
            }
        } else {
            reply("❌ Please quote an image or video to convert it into a sticker.");
        }
    } catch (e) {
        console.error(e);
        reply("❌ An error occurred while creating the sticker.");
    }
});
