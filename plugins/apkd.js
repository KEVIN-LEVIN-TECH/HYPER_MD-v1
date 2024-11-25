const { cmd } = require('../command');
const fs = require('fs');
const path = require('path');

// ========== APK DOWNLOAD COMMAND ==========
cmd({
    pattern: "apkd", // Command that will trigger this functionality
    react: "📥",  // Reaction emoji
    desc: "Download the APK file with the latest version.",
    category: "main",
    filename: __filename,
},
async (conn, mek, m, { from, reply }) => {
    try {
        // APK download message content
        const apkDesc = `
🔢 Reply Below Number

1 || Download Latest APK
2 || APK Info (Size and Version)

©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ 
`;

        // Sending APK Download Menu
        const msg = await conn.sendMessage(from, { text: apkDesc }, { quoted: mek });

        // Listen for User Response
        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            // Validate if the response matches the `.apkd` message
            if (
                msg.message.extendedTextMessage.contextInfo &&
                msg.message.extendedTextMessage.contextInfo.stanzaId === mek.key.id
            ) {
                switch (selectedOption) {
                    case '1': {
                        // Option 1: APK Download
                        const apkUrl = 'https://yourdomain.com/path/to/your-app.apk'; // Update with actual link
                        const apkMessage = `
╭───❮ APK Download Link ❯───────
│
│ 🔗 [Download APK](${apkUrl})
│
│ 📦 APK Size: 25 MB (Example)
│
╰───────────────────────

©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ 
                        `;
                        await conn.sendMessage(from, { text: apkMessage }, { quoted: mek });
                        break;
                    }
                    case '2': {
                        // Option 2: APK Info
                        const apkInfo = `
╭───❮ APK Information ❯─────
│
│ Version: 1.0.0
│ Last Updated: ${new Date().toLocaleDateString()}
│
╰───────────────────
©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ 
                        `;
                        await conn.sendMessage(from, { text: apkInfo }, { quoted: mek });
                        break;
                    }
                    default: {
                        // Invalid Option
                        await conn.sendMessage(from, { text: "❌ Invalid option. Please select a valid number." }, { quoted: mek });
                        break;
                    }
                }
            }
        });
    } catch (e) {
        console.error(e);
        reply("❌ An error occurred while processing your request.");
    }
});
