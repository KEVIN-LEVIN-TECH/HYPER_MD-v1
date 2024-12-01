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
👋 Hello, ${pushname || "User"}

╭─────────────────◈
│🔢 Please select a menu
├───────────────
├ 1 || Download Menu
├ 2 || Main Commands
├ 3 || Group Management
├ 4 || Owner Tools
├ 5 || Convert Commands
├ 6 || Search Functions
├ 7 || Movie Commands
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
│📥 Download Menu
├───────────
├ .fb : Facebook Video
├ .tiktok : TikTok Video
├ .img : Image Search
├ .song : Download Song
├ .apk : APK Downloader
├ .gdrive : Google Drive File
╰────────────────────◈

© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ
                            `;
                            break;
                        }
                        case '2': {
                            responseText = `╭─────────────────◈
│🛠 Main Commands
├───────────
├ .alive : Check Bot Status
├ .ping : Bot Latencyi
├ .menu : Display Menu
╰────────────────────◈

© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ
                            `;
                            break;
                        }
                        case '3': {
                            responseText = `╭─────────────────◈
│👥 Group Management
├─────────────
├ .tagall : Mention Everyone
├ .add : Add Member
├ .kick : Remove Member
├ .promote : Make Admin
├ .demote : Remove Admin
├ .lock : Lock Group
├ .getjid : Channel And Gruop Jid
╰────────────────────◈
© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ
                            `;
                            break;
                        }
                        case '4': {
                            responseText = `╭─────────────────◈            
│👑 Owner Tools
├─────────
├ .ban : Ban User
├ .unban : Unban User
├ .restart : Restart Bot
├ .setppbot : Change Bot DP
╰────────────────────◈

© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ
                            `;
                            break;
                        }
                        case '5': {
                            responseText = `╭─────────────────◈
│🔄 Convert Commands
├─────────────
├ .toimg : Sticker to Image
├ .sticker : Image to Sticker
├ .tomp3 : Video to MP3
├ .tomp4 : Sticker to Video
╰────────────────────◈

© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ
                            `;
                            break;
                        }
                        case '6': {
                            responseText = `╭─────────────────◈
│🔍 Search Functions
├─────────────
├ .ytsearch : YouTube Search
├ .lyrics : Song Lyrics
├ .wiki : Wikipedia Search
╰────────────────────◈

© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ
                            `;
                            break;
                        }
                        case '7': {
                            responseText = `╭─────────────────◈
│ 🎬 Movie Commands
├─────────────
├ .movie : Find Movie Info
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
