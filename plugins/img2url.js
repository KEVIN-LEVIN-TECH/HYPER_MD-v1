const { cmd } = require('../command');
const { img2url } = require('@blackamda/telegram-image-url');
const { getRandom } = require('../lib/functions');
const fs = require('fs');

// Define the img2url command
cmd({
    pattern: "img2url",
    react: "🔗",
    alias: ["tourl", "imgurl", "telegraph", "imgtourl"],
    category: "convert",
    use: '.img2url <reply image>',
    filename: __filename
},
async (conn, mek, m, { reply }) => {
    try {
        // Check if the message is an image or a quoted image
        const isQuotedImage = m.quoted ? (m.quoted.type === 'imageMessage') : false;

        if (m.type === 'imageMessage' || isQuotedImage) {
            const fileType = require("file-type");
            const nameJpg = getRandom(''); // Generate a random name for the image
            const buffer = isQuotedImage ? await m.quoted.download() : await m.download(); // Download the image

            const type = await fileType.fromBuffer(buffer); // Identify the file type
            const fileName = `${nameJpg}.${type.ext}`; // Create a filename with the appropriate extension
            await fs.promises.writeFile(fileName, buffer); // Save the image locally

            // Upload the image and get the URL
            img2url(fileName).then(async url => {
                await reply(`✅ Image successfully uploaded!\n🔗 URL: ${url}`);
                await fs.promises.unlink(fileName); // Delete the local file after uploading
            }).catch(async error => {
                console.error("Upload Error: ", error);
                await reply("❌ Failed to upload image. Please try again.");
            });
        } else {
            // If no image is provided
            await reply("❌ Please reply to an image or send an image directly.");
        }
    } catch (e) {
        console.error("Error: ", e);
        await reply("❌ An error occurred while processing your request.");
    }
});
