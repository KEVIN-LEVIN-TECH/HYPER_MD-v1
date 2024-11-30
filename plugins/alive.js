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
            // Image URL (Replace this with your actual image URL)
            const imageUrl = 'https://i.ibb.co/QdCxSQ6/20241123-121529.jpg'; // Replace with your image URL

            // Alive Message Content
            const aliveDesc = `
👋 Hello, ${pushname || "User"}!

I'm Hyper-MD WhatsApp Bot!

🔢 Reply with a number:

1 || View Bot Status  
2 || Contact Bot Owner  

© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ
`;

            // Sending Alive Message
            const sentMsg = await conn.sendMessage(
                from,
                {
                    image: { url: imageUrl },
                    caption: aliveDesc,
                    contextInfo: {
                        mentionedJid: [m.sender],
                        forwardingScore: 999,
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterName: "HYPER-MD-V1",
                            newsletterJid: "0029VamA19KFCCoY1q9cvn2I@broadcast",
                        },
                    },
                },
                mek ? { quoted: mek } : {}
            );

            // Listen for User Response
            conn.ev.on('messages.upsert', async (msgUpdate) => {
                const userMsg = msgUpdate.messages[0];
                if (!userMsg.message || !userMsg.message.extendedTextMessage) return;

                const selectedOption = userMsg.message.extendedTextMessage.text.trim();

                // Validate if the response matches the `.alive` message
                if (
                    userMsg.message.extendedTextMessage.contextInfo &&
                    userMsg.message.extendedTextMessage.contextInfo.stanzaId === sentMsg.key.id
                ) {
                    switch (selectedOption) {
                        case '1': {
                            // Option 1: Show Bot Status
                            const botStatus = `
╭────❮ *Bot Status* ❯─────╮
│ ✅ *Bot Status*: Online
│ 📅 *Date*: ${new Date().toLocaleDateString()}
│ 🕒 *Time*: ${new Date().toLocaleTimeString()}
╰─────────────────────────╯
`;
                            await conn.sendMessage(
                                from,
                                {
                                    text: botStatus,
                                    contextInfo: {
                                        mentionedJid: [m.sender],
                                        forwardingScore: 999,
                                        isForwarded: true,
                                        forwardedNewsletterMessageInfo: {
                                            newsletterName: "HYPER-MD-V1",
                                            newsletterJid: "0029VamA19KFCCoY1q9cvn2I@broadcast",
                                        },
                                    },
                                },
                                { quoted: userMsg }
                            );
                            break;
                        }
                        case '2': {
                            // Option 2: Send Bot Owner Contact
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
                                { text: "❌ Invalid option. Please select a valid number." },
                                { quoted: userMsg }
                            );
                            break;
                        }
                    }
                }
            });
        } catch (e) {
            console.error(e);
            reply("❌ An error occurred while processing your request.");
        }
    }
);
