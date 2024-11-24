
const { cmd } = require('../command');
const axios = require('axios');

cmd({
    pattern: "mediafire",
    react: "📤",
    desc: "Download files from Mediafire with additional info",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, reply }) => {
    try {
        if (!q) {
            return reply("❌ Please provide the Mediafire URL.");
        }

        const mediafireUrl = q;

        // API endpoint or service that fetches Mediafire file info
        // (Ensure you use a valid API service for Mediafire)
        const response = await axios.get(`https://api.mediafire.com/v1/fileinfo?url=${mediafireUrl}`);
        
        if (!response || !response.data || !response.data.file) {
            return reply("❌ Could not fetch the file from Mediafire. Please ensure the URL is correct.");
        }

        const fileInfo = response.data.file;
        const fileName = fileInfo.name;
        const fileSize = (fileInfo.size / (1024  1024)).toFixed(2); // Convert to MB
        const fileType = fileInfo.type;
        const downloadUrl = fileInfo.dl_url; // Mediafire download URL
        
        let infoMessage = `
╭────❮ Mediafire File ❯───
│
│ ➤ File Name: ${fileName}
│ ➤ Size: ${fileSize} MB
│ ➤ File Type: ${fileType}
│ ➤ Download URL: ${downloadUrl}
│
╰──────────────────

🔢 Reply Below Number

1 | Download File

©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ 
`;

        // Send info message with file details
        const vv = await conn.sendMessage(from, { caption: infoMessage }, { quoted: mek });

        // Wait for user to reply with the option
        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === vv.key.id) {
                switch (selectedOption) {
                    case '1':
                        // Send the file for download
                        await conn.sendMessage(from, { document: { url: downloadUrl }, fileName: fileName, caption: 'ʜʏᴘᴇʀ-ᴍᴅ ᴍᴇᴅɪᴀꜰɪʀᴇ ꜰɪʟᴇ ᴅᴏᴡɴʟᴏᴀᴅ ꜱᴜᴄᴄᴇꜱꜱꜰᴜʟ.' }, { quoted: mek });
                        break;
                    default:
                        reply("❌ Invalid option. Please select a valid option🔴");
                }
            }
        });
    } catch (e) {
        console.error(e);
        reply("❌ An error occurred while processing your request.");
    }
});
