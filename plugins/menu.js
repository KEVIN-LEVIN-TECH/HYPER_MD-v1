const { readEnv } = require('../lib/database');
const { cmd } = require('../command');

// ========== MENU COMMAND ==========
cmd({
    pattern: "menu",
    react: "📜",
    desc: "Display interactive bot menu",
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
                title: "HYPER-MD Bot Menu",
                body: "©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ",
                thumbnailUrl: "https://telegra.ph/file/3c64b5608dd82d33dabe8.jpg",
                mediaType: 1,
                renderLargerThumbnail: true,
            },
        };

        // Bot Menu Content
        const botMenu = `
👋 𝙷𝚎𝚕𝚕𝚘, ${pushname || "User"}

╭─────────────────◈
│🔢 𝙿𝙻𝙴𝙰𝚂𝙴 𝚂𝙴𝙻𝙴𝙲𝚃 𝙰 𝙼𝙴𝙽𝚄
├───────────────
├ 1 || 𝙳𝙾𝚆𝙽𝙻𝙾𝙰𝙳 𝙼𝙴𝙽𝚄
├ 2 || 𝙼𝙰𝙸𝙽 𝙼𝙴𝙽𝚄
├ 3 || 𝙶𝚁𝙾𝚄𝙿 𝙼𝙴𝙽𝚄
├ 4 || 𝙾𝚆𝙽𝙴𝚁 𝚃𝙾𝙾𝙻𝚂
├ 5 || 𝙲𝙾𝙽𝚅𝙴𝚁𝚃 𝙼𝙴𝙽𝚄
├ 6 || 𝚂𝙴𝙰𝚁𝙲𝙷 𝙼𝙴𝙽𝚄
├ 7 || 𝙼𝙾𝚅𝙸𝙴 𝙼𝙴𝙽𝚄
├ 8 || 𝙾𝚃𝙷𝙴𝚁 𝙼𝙴𝙽𝚄
├ 9 || 𝙰𝙸 𝙼𝙴𝙽𝚄
╰────────────────────◈

© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ
        `;

        // Send Menu with ContextInfo
        const sentMsg = await conn.sendMessage(
            from,
            {
                text: botMenu,
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

                // Validate if user is responding to the Menu Message
                if (
                    userMsg.message.extendedTextMessage.contextInfo &&
                    userMsg.message.extendedTextMessage.contextInfo.stanzaId === sentMsg.key.id
                ) {
                    let responseText = "";
                    switch (selectedOption) {
                        case '1': {
                            responseText = `╭─────────────────◈
│📥 𝙳𝙾𝚆𝙽𝙻𝙾𝙰𝙳 𝙼𝙴𝙽𝚄
├───────────
├ .𝙵𝙱
├ .𝚃𝙸𝙺𝚃𝙾𝙺
├ .𝙸𝙼𝙶
├ .𝙰𝙿𝙺𝙳𝙻
├ .𝙶𝙳𝚁𝙸𝚅𝙴
├ .𝙿𝙻𝙰𝚈
├ .𝚅𝙸𝙳𝙴𝙾
├ .𝚅𝙸𝙳𝙴𝙾2
├ .𝚂𝙾𝙽𝙶
├ .𝚂𝙾𝙽𝙶2
├ .𝚃𝚆𝙸𝚃𝙴𝚁
╰────────────────────◈

© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ
                            `;
                            break;
                        }
                        case '2': {
                            responseText = `╭─────────────────◈
│🛠 𝙼𝙰𝙸𝙽 𝙼𝙴𝙽𝚄
├───────────
├ .𝙰𝙻𝙸𝚅𝙴
├ .𝙿𝙸𝙽𝙶
├ .𝙼𝙴𝙽𝚄
├ .𝙰𝙻𝙻𝙼𝙴𝙽𝚄
├ .𝚁𝚄𝙽𝚃𝙸𝙼𝙴
╰────────────────────◈

© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ
                            `;
                            break;
                        }
                        case '3': {
                            responseText = `╭─────────────────◈
│👥 𝙶𝚁𝙾𝚄𝙿 𝙼𝙴𝙽𝚄
├─────────────
├ .𝚃𝙰𝙶𝙰𝙻𝙻
├ .𝙰𝙳𝙳
├ .𝙺𝙸𝙲𝙺
├ .𝙿𝚁𝙾𝙼𝙾𝚃𝙴
├ .𝙳𝙴𝙼𝙾𝚃𝙴
├ .𝙻𝙾𝙲𝙺
├ .𝙶𝙴𝚃𝙹𝙸𝙳
├ .𝚂𝙴𝚃𝚆𝙴𝙻𝙲𝙾𝙼𝙴
├ .𝚂𝙴𝚃𝙶𝙾𝙾𝙳𝙱𝚈𝙴
├ .𝙳𝙴𝙻
├ .𝚄𝙼𝙼𝚄𝚃𝙴
├ .𝙼𝚄𝚃𝙴
╰────────────────────◈
© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ
                            `;
                            break;
                        }
                        case '4': {
                            responseText = `╭─────────────────◈            
│👑 𝙾𝚆𝙽𝙴𝚁 𝚃𝙾𝙾𝙻𝚂
├─────────
├ .𝚂𝙷𝚄𝚃𝙳𝙾𝚆𝙽
├ .𝙱𝚁𝙾𝙰𝙵𝙲𝙰𝚂𝚃
├ .𝚂𝙴𝚃𝙿𝙿
├ .𝙱𝙻𝙾𝙲𝙺
├ .𝚄𝙽𝙱𝙻𝙾𝙲𝙺
├ .𝙲𝙻𝙴𝙰𝚃𝙲𝙷𝙰𝚃𝙴
├ .𝚁𝙴𝚂𝚃𝙰𝚁𝚃
├ .𝚄𝙿𝙳𝙰𝚃𝙴
╰────────────────────◈

© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ
                            `;
                            break;
                        }
                        case '5': {
                            responseText = `╭─────────────────◈
│🔄 𝙲𝙾𝙽𝚅𝙴𝚁𝚃 𝙼𝙴𝙽𝚄
├─────────────
├ .𝚃𝙾𝙼𝙸𝙶
├ .𝚂𝚃𝙸𝙺𝙴𝚁
├ .𝚃𝙾𝙼𝙿3
├ .𝚃𝙾𝙼𝙿4
├ .𝙸𝙼𝙶2𝚄𝚁𝙻
╰────────────────────◈

© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ
                            `;
                            break;
                        }
                        case '6': {
                            responseText = `╭─────────────────◈
│🔍 𝚂𝙴𝙰𝚁𝙲𝙷 𝙼𝚁𝙽𝚄
├─────────────
├ .𝚈𝚃𝚂𝙴𝙰𝚁𝙲𝙷
├ .𝙻𝚈𝚁𝙸𝙲
├ .𝚆𝙸𝙺𝙸
╰────────────────────◈

© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ
                            `;
                            break;
                        }
                        case '7': {
                            responseText = `╭─────────────────◈
│ 🎬 𝙼𝙾𝚅𝙸𝙴 𝙼𝙴𝙽𝚄
├─────────────
├ .𝙼𝙾𝚅𝙸𝙴
╰────────────────────◈

© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ
                            `;
                            break;
                        }
                            case '8': {
                            responseText = `╭─────────────────◈
│ 👨‍💻 𝙾𝚃𝙷𝙴𝚁 𝙼𝙴𝙽𝚄
├─────────────
├ .𝙰𝙽𝙸𝙼𝙴1
├ .𝙰𝙽𝙸𝙼𝙴2
├ .𝙰𝙽𝙸𝙼𝙴3
├ .𝙰𝙽𝙸𝙼𝙴4
├ .𝙰𝙽𝙸𝙼𝙴5
╰────────────────────◈

© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ
                            `;
                            break;
                            }
                            case '9': {
                            responseText = `╭─────────────────◈
│ 🤖 𝙰𝙸 𝙼𝙴𝙽𝚄
├─────────────
├ .𝙰𝙸
├ .𝙿𝚁𝙿𝙳𝙸𝙰2
╰────────────────────◈

© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ
                            `;
                            break;
                            }
                        default: {
                            responseText = "❌ Invalid option. Please select a valid number (1-7).";
                        }
                    }

                    // Send Selected Menu
                    await conn.sendMessage(from, { text: responseText, contextInfo }, { quoted: userMsg });
                }
            } catch (error) {
                console.error("Error handling response: ", error);
            }
        });
    } catch (e) {
        console.error("Error in Menu Command: ", e);
        reply("❌ An error occurred while processing your request.");
    }
});
