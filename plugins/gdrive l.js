const { cmd } = require('../command');
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// Replace YOUR_GOOGLE_AUTH with the appropriate Google Drive API authentication
const auth = new google.auth.GoogleAuth({
    keyFile: 'path/to/your/credentials.json',
    scopes: ['https://www.googleapis.com/auth/drive'],
});

const drive = google.drive({ version: 'v3', auth });

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
        const menu = `
📂 Google Drive Downloader 📂

🔢 Reply Below Number

1️ || Upload a File to Google Drive  
2️ || Download a File from Google Drive  

© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ 
        `;

        const contextInfo = {
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterName: "HYPER-MD",
                newsletterJid: "0029VamA19KFCCoY1q9cvn2I@g.us", // Updated to your channel JID
            },
            externalAdReply: {
                title: "HYPER-MD Gdrive Downloader",
                body: "File Info: Powered by HYPER-MD",
                thumbnailUrl: "https://telegra.ph/file/3c64b5608dd82d33dabe8.jpg", // Default Thumbnail
                mediaType: 1,
                renderLargerThumbnail: true,
            },
        };

        const msg = await conn.sendMessage(from, { text: menu, contextInfo }, { quoted: mek });

        // Handle user responses
        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const userResponse = msgUpdate.messages[0];
            if (!userResponse.message || !userResponse.message.conversation) return;

            const selectedOption = userResponse.message.conversation.trim();

            if (
                userResponse.message.contextInfo &&
                userResponse.message.contextInfo.stanzaId === msg.key.id
            ) {
                switch (selectedOption) {
                    case '1': {
                        const uploadPrompt = `
📤 Please reply to this message with the file you want to upload to Google Drive.
(Ensure it's a document, image, or video file.)
                        `;
                        const uploadMsg = await conn.sendMessage(from, { text: uploadPrompt, contextInfo }, { quoted: userResponse });

                        conn.ev.on('messages.upsert', async (fileMsgUpdate) => {
                            const fileMsg = fileMsgUpdate.messages[0];
                            if (!fileMsg.message || !fileMsg.message.documentMessage) return;

                            const document = fileMsg.message.documentMessage;
                            const fileName = document.fileName || "uploaded_file";
                            const filePath = path.join(__dirname, fileName);

                            // Download file locally
                            const stream = await conn.downloadMediaMessage(fileMsg);
                            fs.writeFileSync(filePath, stream);

                            // Upload to Google Drive
                            const fileMetadata = { name: fileName };
                            const media = { body: fs.createReadStream(filePath) };

                            const uploadedFile = await drive.files.create({
                                resource: fileMetadata,
                                media: media,
                                fields: 'id',
                            });

                            fs.unlinkSync(filePath); // Remove local file

                            const driveLink = `https://drive.google.com/file/d/${uploadedFile.data.id}/view`;
                            const successMessage = `
✅ File Uploaded Successfully!

📄 File Name: ${fileName}  
🔗 [View File](${driveLink})  

© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ
                            `;
                            await conn.sendMessage(from, { text: successMessage, contextInfo }, { quoted: fileMsg });
                        });
                        break;
                    }
                    case '2': {
                        const downloadPrompt = `
📥 Please reply with the Google Drive File ID you want to download.  
(Example: If the link is https://drive.google.com/file/d/FILE_ID/view, reply with "FILE_ID")
                        `;
                        const downloadMsg = await conn.sendMessage(from, { text: downloadPrompt, contextInfo }, { quoted: userResponse });

                        conn.ev.on('messages.upsert', async (idMsgUpdate) => {
                            const idMsg = idMsgUpdate.messages[0];
                            if (!idMsg.message || !idMsg.message.conversation) return;

                            const fileId = idMsg.message.conversation.trim();

                            const destPath = path.join(__dirname, `${fileId}.download`);
                            const dest = fs.createWriteStream(destPath);

                            drive.files.get({ fileId, alt: 'media' }, { responseType: 'stream' },
                                (err, res) => {
                                    if (err) return reply("❌ Error downloading file: " + err.message);

                                    res.data.pipe(dest);
                                    dest.on('finish', async () => {
                                        const fileBuffer = fs.readFileSync(destPath);
                                        await conn.sendMessage(
                                            from,
                                            { document: fileBuffer, fileName: `${fileId}.download`, contextInfo },
                                            { quoted: idMsg }
                                        );
                                        fs.unlinkSync(destPath); // Remove local file
                                    });
                                }
                            );
                        });
                        break;
                    }
                    default: {
                        reply("❌ Invalid option. Please select 1 or 2.");
                    }
                }
            }
        });
    } catch (error) {
        console.error(error);
        reply("❌ An error occurred while processing your request.");
    }
});
