const { cmd } = require('../command');
const axios = require('axios');

cmd({
    pattern: "apk",
    react: "📲",
    desc: "Download APK files with details",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, reply }) => {
    try {
        if (!q) {
            return reply("❌ Please provide the APK URL.");
        }

        const apkUrl = q;

        // Example: Use an API or service that fetches details for APKs
        // Here we'll assume there's a service like 'apk-details-api' to fetch APK file details
        const response = await axios.get(`https://api.apkdetails.com/v1/details?url=${apkUrl}`);
        
        if (!response || !response.data || !response.data.apk) {
            return reply("❌ Could not fetch APK details. Please ensure the URL is correct.");
        }

        const apkInfo = response.data.apk;
        const apkName = apkInfo.name;
        const apkSize = (apkInfo.size / (1024  1024)).toFixed(2); // Convert to MB
        const apkType = apkInfo.type;
        const downloadUrl = apkInfo.dl_url; // APK download URL
        
        let infoMessage = `
╭───❮ APK File Info ❯────────
│
│ ➤ File Name: ${apkName}
│ ➤ Size: ${apkSize} 
│ ➤ File Type: ${apkType}
│ ➤ Download URL: ${downloadUrl}
│
╰───────────────────
🔢 Reply Below Number

1 | Download APK

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
                        // Send the APK file for download
                        await conn.sendMessage(from, { document: { url: downloadUrl }, fileName: apkName, caption: 'ʜʏᴘᴇʀ-ᴍᴅ ᴀᴘᴋ ꜰɪʟᴇ ᴅᴏᴡɴʟᴏᴀᴅ ꜱᴜᴄᴄᴇꜱꜱꜰᴜʟ.' }, { quoted: mek });
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
