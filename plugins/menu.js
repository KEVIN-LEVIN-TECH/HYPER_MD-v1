const { readEnv } = require('../lib/database');
const { cmd } = require('../command');
const os = require('os');

// Menu command
cmd({
    pattern: "menu",
    react: '📜',
    desc: "Get the list of commands",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { 
    from, quoted, pushname, reply 
}) => {
    try {
        const config = await readEnv();

        // Menu selection message
        const selectionMessage = `
👋 Hello ${pushname},

╭──❮ System Information ❯──
│ 
│Memory: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB  
│Prefix: ${config.PREFIX}  
│Version: 1.0.0  
│
╰────────────────

🔢 Reply Below Number

1 | DOWNLOAD MENU  
2 | MAIN MENU  
3 | GROUP MENU  
4 | OWNER MENU  
5 | CONVERT MENU  
6 | SEARCH MENU  

©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ 
`;

        // Send the selection message
        const sentMessage = await conn.sendMessage(from, {
            text: selectionMessage,
        }, { quoted: mek });

        // Wait for the user's response
        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const userResponse = msg.message.extendedTextMessage.text.trim();
            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === sentMessage.key.id) {
                let responseText;

                // Command templates
                switch (userResponse) {
                    case '1': // DOWNLOAD MENU
                        responseText = `
◈╾───DOWNLOAD MENU──╼◈

╭────────●●►
│ ⦁ .fb
│ ⦁ .img
│ ⦁ .mediafire
│ ⦁ .tiktok
│ ⦁ .mfire
│ ⦁ .fb2
│ ⦁ .song
│ ⦁ .video
│ ⦁ .0.1
│ ⦁ .xvideo
│ ⦁ .apk
│ ⦁ .ig1
│ ⦁ .mvdl
│ ⦁ .slsub
│ ⦁ .play
╰─────────────────●●►

©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ 
`;
                        break;
                    case '2': // MAIN MENU
                        responseText = `
◈╾───MAIN MENU──╼◈

╭────────●●►
│ ⦁ .alive
│ ⦁ .menu
│ ⦁ .ping
│ ⦁ .repo
╰─────────────────●●►

©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ 
`;
                        break;
                    case '3': // GROUP MENU
                        responseText = `
◈╾───GROUP MENU──╼◈

╭────────●●►
│ ⦁ .add
│ ⦁ .kick
│ ⦁ .promote
│ ⦁ .demote
│ ⦁ .tagall
│ ⦁ .linkgroup
╰─────────────────●●►

©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ 
`;
                        break;
                    case '4': // OWNER MENU
                        responseText = `
◈╾───OWNER MENU──╼◈

╭────────●●►
│ ⦁ .ban
│ ⦁ .unban
│ ⦁ .block
│ ⦁ .unblock
│ ⦁ .setppbot
│ ⦁ .restart
╰─────────────────●●►

©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ 
`;
                        break;
                    case '5': // CONVERT MENU
                        responseText = `
◈╾───CONVERT MENU──╼◈

╭────────●●►
│ ⦁ .toimg
│ ⦁ .sticker
│ ⦁ .tomp3
│ ⦁ .tomp4
╰─────────────────●●►

©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ 
`;
                        break;
                    case '6': // SEARCH MENU
                        responseText = `
◈╾───SEARCH MENU──╼◈

╭────────●●►
│ ⦁ .ytsearch
│ ⦁ .play
│ ⦁ .lyrics
│ ⦁ .wiki
╰─────────────────●●►

©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ 
`;
                        break;
                    default:
                        responseText = "❌ Invalid option. Please enter a valid number (1-6).";
                }

                // Show the selected menu
                await conn.sendMessage(from, { text: responseText }, { quoted: mek });
            }
        });

    } catch (e) {
        console.error(e);
        reply(`An error occurred: ${e.message}`);
    }
});
