const { cmd } = require('../command');

cmd({
    pattern: "img2url",
    react: "🖼️",
    desc: "Convert an image to URL",
    category: "tools",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, reply }) => {
    try {
        // Check if the message has an image or a quoted message with an image
        let media;
        if (m.message.imageMessage) {
            media = m.message.imageMessage;
        } else if (quoted && quoted.message.imageMessage) {
            media = quoted.message.imageMessage;
        } else {
            return reply("❌ Please send an image or reply to an image to convert it to a URL.");
        }

        // Get the URL of the image from the message
        const imageUrl = media.url;
        
        if (!imageUrl) {
            return reply("❌ Unable to fetch the image URL.");
        }

        // Send the image URL to the user
        reply(`Here is your image URL: ${imageUrl}`);
    } catch (e) {
        console.error(e);
        reply("❌ An error occurred while processing your request.");
    }
});
