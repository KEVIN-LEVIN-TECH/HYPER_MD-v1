const { readEnv } = require('../lib/database');
const { prepareWAMessageMedia } = require('@whiskeysockets/baileys'); 
const { cmd } = require('../command');
const os = require('os');
const imageUrl = 'https://i.ibb.co/1zTvSVj/20241123-121425.jpg';

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
},
async (conn, mek, m, { 
    from, quoted, pushname, reply 
}) => {
    try {
        const config = await readEnv();
        const greeting = getTimeBasedGreeting();

        // Menu selection message
        const selectionMessage = `
👋 ${greeting} ${pushname},

╭──❮ System Information ❯─◈
│Memory: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB  
│Prefix: ${config.PREFIX}  
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
╰─────────────────◈

©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ 
`;
        const sentMsg = await conn.sendMessage(from, {
    image: { url: imageUrl },
    caption: selectionMessage,
    contextInfo: { 
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
            newsletterJid: '0029VamA19KFCCoY1q9cvn2I@broadcast', // WhatsApp Channel Link ID
            newsletterName: "HYPER-MD-V1",
            serverMessageId: "143"
        }
    }
}, mek ? { quoted: mek } : {});


        // Send the selection message
        // const sentMessage = await conn.sendMessage(from, {
        //     text: selectionMessage,
        // }, { quoted: mek });

        // Wait for the user's response
        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const userResponse = msg.message.extendedTextMessage.text.trim();
            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === sentMsg.key.id) {
                let responseText;

                // Command templates
                switch (userResponse) {
                    case '1': // DOWNLOAD MENU
                              responseText = `
                              
◈───❮ DOWNLOAD MENU ❯──◈

╭───────────◈
│ ⦁ .fb
╰────────────────◈
╭───────────◈
│ ⦁ .img
╰────────────────◈
╭───────────◈
│ ⦁ .mediafire
╰────────────────◈
╭───────────◈
│ ⦁ .tiktok
╰────────────────◈
╭───────────◈
│ ⦁ .mfire
╰────────────────◈
╭───────────◈
│ ⦁ .fb2
╰────────────────◈
╭───────────◈
│ ⦁ .song
╰────────────────◈
╭───────────◈
│ ⦁ .video
╰────────────────◈
╭───────────◈
│ ⦁ .apk
╰────────────────◈
╭───────────◈
│ ⦁ .play
╰────────────────◈
╭───────────◈
│ ⦁ .gdrive
╰────────────────◈

©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ
`; 
           const mediaMessage = await prepareWAMessageMedia({
        image: { url: `https://i.ibb.co/1zTvSVj/20241123-121425.jpg` }
    }, { upload: conn.waUploadToServer });

    
    const sentMsg = await conn.sendMessage(from, {
    image: { url: imageUrl },
    caption: selectionMessage,
    contextInfo: { 
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
            newsletterJid: '0029VamA19KFCCoY1q9cvn2I@broadcast', // WhatsApp Channel Link ID
            newsletterName: "HYPER-MD-V1",
            serverMessageId: "143"
        }
    }
}, mek ? { quoted: mek } : {});

    break;
                    case '2':
    responseText = `
◈───❮ MAIN MENU ❯──◈

╭───────────◈
│ ⦁ .alive
╰────────────────◈
╭───────────◈
│ ⦁ .menu
╰────────────────◈
╭───────────◈
│ ⦁ .ping
╰────────────────◈
╭───────────◈
│ ⦁ .repo
╰────────────────◈
╭───────────◈
│ ⦁ .system
╰────────────────◈

©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ 
`;

    const messageContent = {
        text: responseText,
        contextInfo: {
            mentionedJid: [m.sender],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363312962611506@newsletter',
                newsletterName: "HYPER-MD-V1",
                serverMessageId: 143
            }
        }
    };

    await conn.sendMessage(from, messageContent, { quoted: mek });
    break;
                    case '3': // GROUP MENU
                        responseText = `
◈───❮ GROUP MENU ❯──◈

╭───────────◈
│ ⦁ .mute
╰────────────────◈
╭───────────◈
│ ⦁ .unmute
╰────────────────◈
╭───────────◈
│ ⦁ .promote
╰────────────────◈
╭───────────◈
│ ⦁ .demote
╰────────────────◈
╭───────────◈
│ ⦁ .del
╰────────────────◈
╭───────────◈
│ ⦁ .add
╰────────────────◈
╭───────────◈
│ ⦁ .setgoodbye
╰────────────────◈
╭───────────◈
│ ⦁ .setwelcome
╰────────────────◈
╭───────────◈
│ ⦁ .admins
╰────────────────◈
╭───────────◈
│ ⦁ .groupdesc
╰────────────────◈
╭───────────◈
│ ⦁ .groupinfo
╰────────────────◈
╭───────────◈
│ ⦁ .grouplink
╰────────────────◈
╭───────────◈
│ ⦁ .gname
╰────────────────◈
╭───────────◈
│ ⦁ .setsubject
╰────────────────◈
╭───────────◈
│ ⦁ .tagall
╰────────────────◈
╭───────────◈
│ ⦁ .requests
╰────────────────◈
╭───────────◈
│ ⦁ .accept
╰────────────────◈
╭───────────◈
│ ⦁ .reject
╰────────────────◈
╭───────────◈
│ ⦁ .hidetag
╰────────────────◈
╭───────────◈
│ ⦁ .kick
╰────────────────◈
╭───────────◈
│ ⦁ .unlock
╰────────────────◈
╭───────────◈
│ ⦁ .lock
╰────────────────◈
╭───────────◈
│ ⦁ .approve
╰────────────────◈
╭───────────◈
│ ⦁ .poll
╰────────────────◈
╭───────────◈
│ ⦁ .getpic
╰────────────────◈

©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ 
`;
                // Send the GRUOP MENU with contextInfo
        const sentMsg = await conn.sendMessage(from, {
    image: { url: imageUrl },
    caption: selectionMessage,
    contextInfo: { 
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
            newsletterJid: '0029VamA19KFCCoY1q9cvn2I@broadcast', // WhatsApp Channel Link ID
            newsletterName: "HYPER-MD-V1",
            serverMessageId: "143"
        }
    }
}, mek ? { quoted: mek } : {});

                        break;
                    case '4': // OWNER MENU
                        responseText = `
◈───❮ OWNER MENU ❯──◈

╭───────────◈
│ ⦁ .ban
╰────────────────◈
╭───────────◈
│ ⦁ .unban
╰────────────────◈
╭───────────◈
│ ⦁ .block
╰────────────────◈
╭───────────◈
│ ⦁ .unblock
╰────────────────◈
╭───────────◈
│ ⦁ .setppbot
╰────────────────◈
╭───────────◈
│ ⦁ .restart
╰────────────────◈
╭───────────◈
│ ⦁ .update
╰────────────────◈

©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ 
`;
const sentMsg = await conn.sendMessage(from, {
    image: { url: imageUrl },
    caption: selectionMessage,
    contextInfo: { 
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
            newsletterJid: '0029VamA19KFCCoY1q9cvn2I@broadcast', // WhatsApp Channel Link ID
            newsletterName: "HYPER-MD-V1",
            serverMessageId: "143"
        }
    }
}, mek ? { quoted: mek } : {});

                        break;
                    case '5': // CONVERT MENU
                        responseText = `
◈───❮ CONVERT MENU ❯──◈

╭───────────◈
│ ⦁ .toimg
╰────────────────◈
╭───────────◈
│ ⦁ .sticker
╰────────────────◈
╭───────────◈
│ ⦁ .tomp3
╰────────────────◈
╭───────────◈
│ ⦁ .tomp4
╰────────────────◈
╭───────────◈
│ ⦁ .img2url
╰────────────────◈

©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ 
`;
const sentMsg = await conn.sendMessage(from, {
    image: { url: imageUrl },
    caption: selectionMessage,
    contextInfo: { 
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
            newsletterJid: '0029VamA19KFCCoY1q9cvn2I@broadcast', // WhatsApp Channel Link ID
            newsletterName: "HYPER-MD-V1",
            serverMessageId: "143"
        }
    }
}, mek ? { quoted: mek } : {});


                        break;
                    case '6': // SEARCH MENU
                        responseText = `
◈───❮ SEARCH MENU ❯──◈

╭───────────◈
│ ⦁ .ytsearch
╰────────────────◈
╭───────────◈
│ ⦁ .play
╰────────────────◈
╭───────────◈
│ ⦁ .lyrics
╰────────────────◈
╭───────────◈
│ ⦁ .wiki
╰────────────────◈

©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ 
`;
const sentMsg = await conn.sendMessage(from, {
    image: { url: imageUrl },
    caption: selectionMessage,
    contextInfo: { 
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
            newsletterJid: '0029VamA19KFCCoY1q9cvn2I@broadcast', // WhatsApp Channel Link ID
            newsletterName: "HYPER-MD-V1",
            serverMessageId: "143"
        }
    }
}, mek ? { quoted: mek } : {});

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
