const { readEnv } = require('../lib/database');
const { cmd } = require('../command');

// ========== ALIVE COMMAND ==========
cmd(
    {
        pattern: "alive",
        react: "👋",
        desc: "Check bot status and display interactive menu",
        category: "main",
        filename: __filename,
    },
    async (conn, mek, m, { from, reply, pushname }) => {
        try {
            // Image URL
            const imageUrl = 'https://i.ibb.co/QdCxSQ6/20241123-121529.jpg'; // ඔබේ ඡායාරූපය මෙහි දමන්න.

            // Alive message content
            const aliveMessage = `
👋 Hello, ${pushname || "User"}!

I'm *Hyper-MD* WhatsApp Bot!

🔢 *Choose an option below:*

1️ View Bot Status  
2️ Contact Bot Owner  

© Powered by Mr. Senesh
`;

            // Send alive message with image and buttons
            const sentMsg = await conn.sendMessage(from, {
                image: { url: imageUrl },
                caption: aliveMessage,
                buttons: [
                    { buttonId: 'bot_status', buttonText: { displayText: '1️⃣ View Bot Status' }, type: 1 },
                    { buttonId: 'contact_owner', buttonText: { displayText: '2️⃣ Contact Bot Owner' }, type: 1 },
                ],
                headerType: 4,
            });

            // Handle Button Responses
            conn.ev.on('messages.upsert', async (msgUpdate) => {
                const userMsg = msgUpdate.messages[0];
                if (!userMsg.message || !userMsg.message.buttonsResponseMessage) return;

                const buttonId = userMsg.message.buttonsResponseMessage.selectedButtonId;

                // Validate response
                if (
                    userMsg.message.buttonsResponseMessage.contextInfo &&
                    userMsg.message.buttonsResponseMessage.contextInfo.stanzaId === sentMsg.key.id
                ) {
                    switch (buttonId) {
                        case 'bot_status': {
                            // Option 1: Bot Status
                            const botStatus = `
╭────❮ *Bot Status* ❯─────╮
│ ✅ *Bot Status*: Online
│ 📅 *Date*: ${new Date().toLocaleDateString()}
│ 🕒 *Time*: ${new Date().toLocaleTimeString()}
╰─────────────────────────╯
`;
                            await conn.sendMessage(from, { text: botStatus }, { quoted: userMsg });
                            break;
                        }
                        case 'contact_owner': {
                            // Option 2: Contact Bot Owner
                            const vcard = `BEGIN:VCARD
VERSION:3.0
FN:Mr. Senesh
ORG:Hyper-MD
TEL;type=CELL;type=VOICE;waid=94784337506:+94 78 433 7506
EMAIL:senesh@gmail.com
END:VCARD`;
                            await conn.sendMessage(from, {
                                contacts: {
                                    displayName: 'Mr. Senesh',
                                    contacts: [{ vcard }],
                                },
                            });
                            break;
                        }
                        default: {
                            // Invalid Option
                            await conn.sendMessage(
                                from,
                                { text: "❌ Invalid option. Please choose 1️⃣ or 2️⃣." },
                                { quoted: userMsg }
                            );
                            break;
                        }
                    }
                }
            });
        } catch (error) {
            console.error(error);
            reply("❌ An error occurred while processing your request.");
        }
    }
);
