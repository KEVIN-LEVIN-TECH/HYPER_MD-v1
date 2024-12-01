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
        // Forwarding Metadata
        const contextInfo = {
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterName: "HYPER-MD",
                newsletterJid: "120363325937635174@newsletter",
            },
            externalAdReply: {
                title: "HYPER-MD Alive",
                body: "©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ ",
                thumbnailUrl: "https://telegra.ph/file/3c64b5608dd82d33dabe8.jpg",
                mediaType: 1,
                renderLargerThumbnail: true,
            },
        };

        // Alive Menu Content
        const aliveMenu = `
👋 Hello, ${pushname || "User"}

I'm Hyper-MD WhatsApp Bot!

🔢 Choose an option below
1 || Get Menu
2 || Contact Bot Owner

© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ
        `;

        // Send Menu with ContextInfo
        const sentMsg = await conn.sendMessage(
            from,
            {
                text: aliveMenu,
                contextInfo,
            },
            { quoted: mek }
        );

        // Listen for User Responses
        conn.ev.on('messages.upsert', async (msgUpdate) => {
            try {
                const userMsg = msgUpdate.messages[0];
                if (!userMsg.message || !userMsg.message.extendedTextMessage) return;

                const selectedOption = userMsg.message.extendedTextMessage.text.trim();

                // Validate if user is responding to the Alive Message
                if (
                    userMsg.message.extendedTextMessage.contextInfo &&
                    userMsg.message.extendedTextMessage.contextInfo.stanzaId === sentMsg.key.id
                ) {
                    switch (selectedOption) {
                        case '1': {
                            // Option 1: Trigger Menu Plugin
                            const menuTrigger = ".menu\n\n©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ "; // Replace with your actual menu command
                            await conn.sendMessage(from, { text: `🔄 Redirecting to the bot menu...\n\n${menuTrigger}` }, { quoted: userMsg });
                            // Simulate Menu Command Execution
                            conn.emit('cmd', menuTrigger, userMsg.key.remoteJid, userMsg);
                            break;
                        }
                        case '2': {
                            // Option 2: Contact Owner
                            const vcard = `
BEGIN:VCARD
VERSION:3.0
FN:Mr. Senesh
ORG:Mr. Senesh
TEL;type=CELL;type=VOICE;waid=94784337506:+94 78 433 7506
EMAIL:senesh@gmail.com
END:VCARD
                            `;
                            await conn.sendMessage(
                                from,
                                { contacts: { displayName: 'Mr. Senesh', contacts: [{ vcard }] } },
                                { quoted: userMsg }
                            );
                            break;
                        }
                        default: {
                            // Invalid Option
                            await conn.sendMessage(from, { text: "❌ Invalid option. Please select a valid number (1 or 2)." }, { quoted: userMsg });
                            break;
                        }
                    }
                }
            } catch (error) {
                console.error("Error handling response: ", error);
            }
        });
    } catch (e) {
        console.error("Error in Alive Command: ", e);
        reply("❌ An error occurred while processing your request.");
    }
});
