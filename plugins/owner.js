const {cmd , commands} = require('../command')

cmd({
    pattern: "owner",
    desc: "owner the bot",
    category: "main",
    react: "👨‍💻",
    filename: __filename
},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

let dec = `Hyper MD Whatsapp Bot

| ᴏᴡɴᴇʀ ɴᴀᴍᴇ: Mr Senesh (KEVIN)
| ɴᴜᴍʙᴇʀ: 94784337506
| ʏᴏᴜᴛᴜʙᴇ: 
| ᴡʜᴀᴛꜱᴀᴘᴘ ᴄʜᴀɴɴᴇʟ: 

©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ
`
return await conn.sendMessage(from,{image: {url: config.ALIVE_IMG},caption: des},{quoted: mek})
}catch(e){
console.log(e)
reply(`${e}`)
}
})
