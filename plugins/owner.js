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

let dec = `Hyper MD Whatsapp Bot Owner

| ᴏᴡɴᴇʀ ɴᴀᴍᴇ: Mr Senesh (KEVIN)
| ɴᴜᴍʙᴇʀ: 94784337506
| ʏᴏᴜᴛᴜʙᴇ: 
| ᴡʜᴀᴛꜱᴀᴘᴘ ᴄʜᴀɴɴᴇʟ: https://whatsapp.com/channel/0029VamA19KFCCoY1q9cvn2I

©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ
`
await conn.sendMessage(from,{image:{url: `https://github.com/KEVIN-LEVIN-TECH/HYPER_MD-v1/blob/main/midea/20241123_124107.jpg` },caption:dec},{quoted:mek});

}catch(e){
console.log(e)
reply(`${e}`)
}
})
