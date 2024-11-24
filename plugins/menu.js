const { readEnv } = require('../lib/database');
const { cmd, commands } = require('../command');

cmd({
    pattern: "menu",
    react: '📜',
    desc: "get cmd list",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { 
    from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply 
}) => {
    try {
        const config = await readEnv();
        let menu = {
            main: '',
            download: '',
            group: '',
            owner: '',
            convert: '',
            search: '',
        };

        // Create command lists by category
        for (let i = 0; i < commands.length; i++) {
            if (commands[i].pattern && !commands[i].dontAddCommandList) {
                menu[commands[i].category] += `${config.PREFIX}${commands[i].pattern}\n`;
            }
        }

        // Create menu template
        let madeMenu = `
 Hello 👋 ${pushname}
 
╭━━━━ Cᴏᴍᴍᴀɴᴅꜱ Pᴀɴᴇʟ━━━━━━
│ Ram usage: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
│ Prefix: ${config.PREFIX}
│ Versions: 1.0.0
╰━━━━━━━━━━━━━━━━━━━ 

 Hʏᴘᴇʀ-MD Cᴏᴍᴍᴀɴᴅꜱ Pᴀɴᴇʟ

╭━━❮ MAIN COMMAND ❯━●●►
${menu.main}
╰━━━━━━━━━━━━━━━━━━━
╭━━❮ DOWNLOAD COMMAND ❯━●●►
${menu.download}
╰━━━━━━━━━━━━━━━━━━━
╭━━❮ GROUP COMMAND ❯━●●►
${menu.group}
╰━━━━━━━━━━━━━━━━━━━
╭━━❮ OWNER COMMAND ❯━●●►
${menu.owner}
╰━━━━━━━━━━━━━━━━━━━
╭━━❮ CONVERT COMMAND ❯━●●►
${menu.convert}
╰━━━━━━━━━━━━━━━━━━━
╭━━❮ SEARCH COMMAND ❯━●●►
${menu.search}
╰━━━━━━━━━━━━━━━━━━━

©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ
`;

        // Send audio
        await conn.sendMessage(from, {
            audio: { url: 'https://github.com/KEVIN-LEVIN-TECH/Hyper-md-voice/raw/refs/heads/main/auto_voice/ca15f4b2-da73-4901-90ad-6ed40b743bfe.mp3' },
            mimetype: 'audio/mp4',
            ptt: true
        }, { quoted: mek });

        // Send menu image with caption
        await conn.sendMessage(from, {
            image: { url: `https://i.ibb.co/1zTvSVj/20241123-121425.jpg` },
            caption: madeMenu
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
