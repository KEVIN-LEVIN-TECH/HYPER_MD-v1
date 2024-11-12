const {cmd , commands} = require('../command')

cmd({
    pattern: "menu",
    desc: "menu the bot",
    category: "menu",
    react: "📜",
    filename: __filename
},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

let dec = `

╭─────────────━┈⊷
│👾 ʙᴏᴛ ɴᴀᴍᴇ: HYPER MD
│👨‍💻 ᴏᴡɴᴇʀ : Mr Senesh   
│👤 ɴᴜᴍʙᴇʀ: 94784337506
│💻 HOSTER: Kevin
│💫 ᴘʀᴇғɪx: [Multi-Prefix]
╰─────────────━┈⊷ 
╭━❮ 𝙲𝙾𝙽𝚅𝙴𝚁𝚃𝙴𝚁 ❯━╮
${menu.converter}
╰━━━━━━━━━━━━━━━⪼
╭━❮ 𝙵𝚄𝙽 ❯━╮
${menu.fun}
╰━━━━━━━━━━━━━━━⪼
╭━❮ 𝙶𝚁𝙾𝚄𝙿 ❯━╮
${menu.group}
╰━━━━━━━━━━━━━━━⪼
╭━❮ 𝙳𝙾𝚆𝙽𝙻𝙾𝙰𝙳 ❯━╮
${menu.download}
╰━━━━━━━━━━━━━━━⪼
╭━❮ 𝙼𝙰𝙸𝙽 ❯━╮
${menu.main}
╰━━━━━━━━━━━━━━━⪼
╭━❮ 𝙰𝙽𝙸𝙼𝙴 ❯━╮
${menu.anime}
╰━━━━━━━━━━━━━━━⪼
╭━❮ 𝙾𝚆𝙽𝙴𝚁 ❯━╮
${menu.owner}
╰━━━━━━━━━━━━━━━⪼
 ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ
`
await conn.sendMessage(from,{image:{url: `https://telegra.ph/file/7f0d7a04a30a602307e3d.jpg`},caption:dec},{quoted:mek});

}catch(e){
console.log(e)
reply(`${e}`)
}
})
