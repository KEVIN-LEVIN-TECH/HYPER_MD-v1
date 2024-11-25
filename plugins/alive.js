const { readEnv } = require('../lib/database');
const { cmd } = require('../command');

// ========== ALIVE COMMAND ==========
cmd({
    pattern: "alive",
    react: "👋",
    desc: "Check bot status and display interactive menu",
    category: "main",
    filename: __filename,
},
async (conn, mek, m, { from, reply, pushname }) => {
    try {
        // Alive Message Content
        const aliveDesc = `
👋 Hello, ${pushname || "User"}

I'm Hyper-MD WhatsApp Bot!

🔢 Reply Below Number

1 || View Bot Status
2 || Contact Bot Owner

©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ
`;

        // Sending Alive Message with Options
        const msg = await conn.sendMessage(from, { text: aliveDesc }, { quoted: mek });

        // Listen for User Response
        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            // Validate if the response matches the `.alive` message
            if (
                msg.message.extendedTextMessage.contextInfo &&
                msg.message.extendedTextMessage.contextInfo.stanzaId === mek.key.id
            ) {
                switch (selectedOption) {
                    case '1': {
                        // Option 1: Show Bot Status
                        const botStatus = `
✅ Bot Status: Online

📅 Date: ${new Date().toLocaleDateString()}
🕒 Time: ${new Date().toLocaleTimeString()}

©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ
                        `;
                        await conn.sendMessage(from, { text: botStatus }, { quoted: mek });
                        break;
                    }
                    case '2': {
                        // Option 2: Contact Bot Owner
                        const ownerContact = `
📞 Owner Contactල

Name: Mr. Senesh
WhatsApp: wa.me/94784337506

Feel free to reach out for inquiries or assistance!

©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ
                        `;
                        await conn.sendMessage(from, { text: ownerContact }, { quoted: mek });
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
