const { cmd } = require('../command');
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// ========== GOOGLE DRIVE PLUGIN ==========
cmd({
    pattern: "gdrive",
    react: "📂",
    desc: "Upload/Download files using Google Drive.",
    category: "utility",
    filename: __filename,
},
async (conn, mek, m, { from, reply }) => {
    try {
        // Display menu to user
        const menu = `
🔢 Reply Below Number

1 || Upload a File to Google Drive
2 || Download a File from Google Drive

©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ 
        `;

        const msg = await conn.sendMessage(from, { text: menu }, { quoted: mek });

        // Handle user response
        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const userResponse = msgUpdate.messages[0];
            if (!userResponse.message || !userResponse.message.extendedTextMessage) return;

            const selectedOption = userResponse.message.extendedTextMessage.text.trim();

            if (
                userResponse.message.extendedTextMessage.contextInfo &&
                userResponse.message.extendedTextMessage.contextInfo.stanzaId === mek.key.id
            ) {
                switch (selectedOption) {
                    case '1': {
                        // Upload File Option
                        const uploadMessage = `
📤 Please reply to this message with the file you want to upload to Google Drive.
(Ensure it's a document, image, or video file.)
                        `;
                        await conn.sendMessage(from, { text: uploadMessage }, { quoted: userResponse });

                        // Wait for the file message
                        conn.ev.on('messages.upsert', async (fileMsgUpdate) => {
                            const fileMsg = fileMsgUpdate.messages[0];
                            if (!fileMsg.message || !fileMsg.message.documentMessage) return;

                            const document = fileMsg.message.documentMessage;
                            const fileName = document.fileName || "uploaded_file";
                            const filePath = path.join(__dirname, fileName);

                            // Download the file locally
                            const stream = await conn.downloadMediaMessage(fileMsg);
                            fs.writeFileSync(filePath, stream);

                            // Get file size
                            const fileSize = (fs.statSync(filePath).size / (1024 * 1024)).toFixed(2) + " MB";

                            // Authenticate and upload to Google Drive
                            const drive = google.drive({ version: 'v3', auth: YOUR_GOOGLE_AUTH });
                            const fileMetadata = { name: fileName };
                            const media = { body: fs.createReadStream(filePath) };

                            const uploadedFile = await drive.files.create({
                                resource: fileMetadata,
                                media: media,
                                fields: 'id',
                            });

                            fs.unlinkSync(filePath); // Delete local file after upload

                            const driveLink = `https://drive.google.com/file/d/${uploadedFile.data.id}/view`;
                            const successMessage = `
✅ File uploaded successfully!

- 📄 File Name: ${fileName}
- 📦 File Size: ${fileSize}
- 🔗 [Download/Access File](${driveLink})

©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ 
                            `;
                            await conn.sendMessage(from, { text: successMessage }, { quoted: fileMsg });
                        });
                        break;
                    }
                    case '2': {
                        // Download File Option
                        const downloadMessage = `
📥 Please reply with the Google Drive file ID you want to download.
(Example: If the link is https://drive.google.com/file/d/FILE_ID/view, reply with "FILE_ID")
                        `;
                        await conn.sendMessage(from, { text: downloadMessage }, { quoted: userResponse });

                        // Wait for the file ID
                        conn.ev.on('messages.upsert', async (idMsgUpdate) => {
                            const idMsg = idMsgUpdate.messages[0];
                            if (!idMsg.message || !idMsg.message.conversation) return;

                            const fileId = idMsg.message.conversation.trim();

                            // Authenticate and download from Google Drive
                            const drive = google.drive({ version: 'v3', auth: YOUR_GOOGLE_AUTH });
                            const dest = fs.createWriteStream(path.join(__dirname, `${fileId}.download`));

                            drive.files.get({ fileId: fileId, alt: 'media' }, { responseType: 'stream' },
                                (err, res) => {
                                    if (err) return reply("❌ Error downloading file: " + err.message);
                                    res.data.pipe(dest);

                                    dest.on('finish', async () => {
                                        const fileBuffer = fs.readFileSync(dest.path);
                                        await conn.sendMessage(from, { document: fileBuffer, fileName: `${fileId}.download` }, { quoted: idMsg });
                                        fs.unlinkSync(dest.path); // Delete local file after sending
                                    });
                                });
                        });
                        break;
                    }
                    default: {
                        await conn.sendMessage(from, { text: "❌ Invalid option. Please select a valid number." }, { quoted: userResponse });
                        break;
                    }
                }
            }
        });
    } catch (error) {
        console.error(error);
        reply("❌ An error occurred while processing your request.");
    }
});
