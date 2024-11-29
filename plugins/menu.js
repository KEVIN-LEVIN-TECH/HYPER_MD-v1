const { readEnv } = require('../lib/database');
const { prepareWAMessageMedia } = require('@whiskeysockets/baileys'); 
const { cmd } = require('../command');
const os = require('os');

// Function to determine greeting based on the time
function getTimeBasedGreeting() {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
        return "Good Morning 🌅";
    } else if (currentHour >= 12 && currentHour < 17) {
        return "Good Afternoon ☀️";
    } else if (currentHour >= 17 && currentHour < 21) {
        return "Good Evening 🌇";
    } else {
        return "Good Night 🌙";
    }
}

// Menu command
cmd({
    pattern: "menu",
    react: '📜',
    desc: "Get the list of commands",
    category: "main",
    filename: __filename
}, async (conn, mek, m, { from, quoted, pushname, reply }) => {
    try {
        const config = await readEnv();
        const greeting = getTimeBasedGreeting();

        // Menu selection message
        const selectionMessage = `
👋 ${greeting} ${pushname || 'User'},

╭──❮ System Information ❯─◈
│Memory: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB  
│Prefix: ${config.PREFIX || '.'}  
│Version: 1.0.0  
╰────────────────────◈

╭───────────◈
│Reply Below Number
╰────────────────◈

╭──────────────◈
│ ◈ 1 . DOWNLOAD MENU  
│ ◈ 2 . MAIN MENU 
│ ◈ 3 . GROUP MENU 
│ ◈ 4 . OWNER MENU  
│ ◈ 5 . CONVERT MENU  
│ ◈ 6 . SEARCH MENU  
│ ◈ 7 . MOVIE MENU
╰─────────────────◈

©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ 
`;

        // Send the selection message
        const sentMsg = await conn.sendMessage(from, { text: selectionMessage }, { quoted: mek });

        // Wait for the user's response
        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const userResponse = msg.message.extendedTextMessage.text.trim();
            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === sentMsg.key.id) {
                let responseText;

                // Command templates
                switch (userResponse) {
                    case '1':
                        responseText = `
◈───❮ DOWNLOAD MENU ❯──◈

╭───────────◈
│ ⦁ .fb
│ ⦁ .img
│ ⦁ .mediafire
│ ⦁ .tiktok
│ ⦁ .mfire
│ ⦁ .fb2
│ ⦁ .song
│ ⦁ .video
│ ⦁ .apk
│ ⦁ .apk2
│ ⦁ .play
│ ⦁ .gdrive
╰────────────────◈

©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ
`;
                        break;

                    case '2':
                        responseText = `
◈───❮ MAIN MENU ❯──◈

╭───────────◈
│ ⦁ .alive
│ ⦁ .menu
│ ⦁ .ping
│ ⦁ .repo
│ ⦁ .system
╰────────────────◈

©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ
`;
                        break;

                    case '3':
                        responseText = `
◈───❮ GROUP MENU ❯──◈

╭───────────◈
│ ⦁ .mute
│ ⦁ .unmute
│ ⦁ .promote
│ ⦁ .demote
│ ⦁ .del
│ ⦁ .add
│ ⦁ .setgoodbye
│ ⦁ .setwelcome
│ ⦁ .admins
│ ⦁ .groupdesc
│ ⦁ .groupinfo
│ ⦁ .grouplink
│ ⦁ .gname
│ ⦁ .setsubject
│ ⦁ .tagall
│ ⦁ .requests
│ ⦁ .accept
│ ⦁ .reject
│ ⦁ .hidetag
│ ⦁ .kick
│ ⦁ .unlock
│ ⦁ .lock
│ ⦁ .approve
│ ⦁ .poll
│ ⦁ .getpic
│ ⦁ .jid
╰────────────────◈

©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ
`;
                        break;

                    case '4':
                        responseText = `
◈───❮ OWNER MENU ❯──◈

╭───────────◈
│ ⦁ .ban
│ ⦁ .unban
│ ⦁ .block
│ ⦁ .unblock
│ ⦁ .setppbot
│ ⦁ .restart
│ ⦁ .update
╰────────────────◈

©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ
`;
                        break;

                    case '5':
                        responseText = `
◈───❮ CONVERT MENU ❯──◈

╭───────────◈
│ ⦁ .toimg
│ ⦁ .sticker
│ ⦁ .tomp3
│ ⦁ .tomp4
│ ⦁ .img2url
╰────────────────◈

©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ
`;
                        break;

                    case '6':
                        responseText = `
◈───❮ SEARCH MENU ❯──◈

╭───────────◈
│ ⦁ .ytsearch
│ ⦁ .play
│ ⦁ .lyrics
│ ⦁ .wiki
╰────────────────◈

©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ
`;
                        break;

                       case '7':
                        responseText = `◈───❮ MOVIE MENU ❯──◈

╭───────────◈
│ ⦁ .movie
╰────────────────◈

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
