const config = require('../config');
const { cmd, commands } = require('../command');
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson } = require('../lib/functions');

function genMsgId() {
    const prefix = "3EB";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    let randomText = prefix;

    for (let i = prefix.length; i < 22; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomText += characters.charAt(randomIndex);
    }

    return randomText;
}

//---------------------------------------------------------------------------

cmd({
    pattern: "menu",
    react: "📜",
    alias: ["panel", "list", "commands"],
    desc: "Get bot's command list.",
    category: "main",
    use: '.menu',
    filename: __filename
},
async(conn, mek, m, { from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isSachintha, isSavi, isSadas, isMani, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let menuc1 = ``
        for (let i = 0; i < commands.length; i++) {
            if (commands[i].category === 'admin') {
                if (!commands[i].dontAddCommandList) {
                    menuc1 += `*│🔧* .${commands[i].pattern}\n`
                }
            }
        };

        let menuc2 = ``
        for (let i = 0; i < commands.length; i++) {
            if (commands[i].category === 'main') {
                if (!commands[i].dontAddCommandList) {
                    menuc2 += `*│⭐* .${commands[i].pattern}\n`
                }
            }
        };

        let menuc3 = ``
        for (let i = 0; i < commands.length; i++) {
            if (commands[i].category === 'convert') {
                if (!commands[i].dontAddCommandList) {
                    menuc3 += `*│🔄* .${commands[i].pattern}\n`
                }
            }
        };

        let menuc4 = ``
        for (let i = 0; i < commands.length; i++) {
            if (commands[i].category === 'search') {
                if (!commands[i].dontAddCommandList) {
                    menuc4 += `*│🔍* .${commands[i].pattern}\n`
                }
            }
        };

        let menuc = ``
        for (let i = 0; i < commands.length; i++) {
            if (commands[i].category === 'download') {
                if (!commands[i].dontAddCommandList) {
                    menuc += `*│⬇️* .${commands[i].pattern}\n`
                }
            }
        };

        let menuc6 = ``
        for (let i = 0; i < commands.length; i++) {
            if (commands[i].category === 'owner') {
                if (!commands[i].dontAddCommandList) {
                    menuc6 += `*│👑* .${commands[i].pattern}\n`
                }
            }
        };

        let menumg = `*Hello 👸* ${pushname}

*╭─     ᴄᴏᴍᴍᴀɴᴅꜱ ᴘᴀɴᴇʟ*
*│🕵️‍♂️ 𝘙𝘂𝘯 𝘛𝘪𝘮𝘦 -* ${runtime(process.uptime())}
*│🕵️‍♂️ 𝘙𝘢𝘮 𝘜𝘴𝘦 -* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem() / 1024 / 1024)}MB
*╰──────────●●►*
*👸 𝘒𝘐𝘕𝘎 𝘒𝘌𝘝𝘐𝘕 𝘔𝘋 𝘊𝘰𝘮𝘮𝘢𝘯𝘥 𝘗𝘢𝘯𝘦𝘭*
*╭──────────●●►*
*│🧙‍♂️ MAIN COMMANDS*
*│   ───────*
${menuc2}
*╰───────────●●►*

*•𝙆𝙄𝙉𝙂 𝙆𝙀𝙑𝙄𝙉 𝙈𝘿 𝙈𝙐𝙇𝙏𝙄 𝘿𝙀𝙑𝙄𝘾𝙀•*`

        await conn.sendMessage(from, { image: { url: config.LOGO }, caption: menumg }, { quoted: mek, messageId: genMsgId() })
    } catch (e) {
        reply('*Error !!*')
        l(e)
    }
});

