const {cmd , commands} = require('../command')

cmd({
    pattern: "repo",
    desc: "repo the bot",
    category: "main",
    react: "📡",
    filename: __filename
},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

let dec = `*👨‍💻 Hyper MD Repastitory Information*

*| ɴᴀᴍᴇ*: Hyper-MD
*| ᴏᴡɴᴇʀ*: Mr Senesh (KEVIN)
*| ɴᴜᴍʙᴇʀ*: 94784337506
*| ᴠᴇʀꜱɪᴏɴ*: 1.0.0


*📡 REPO LINK*
🔗◦https://github.com/KEVIN-LEVIN-TECH/Hyper-MD-v1

*📌 SUBSCRIBE MY YOUTUBE CHANNEL*
🔗◦ 

©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ
`
await conn.sendMessage(from,{image:{url: `https://telegra.ph/file/7f0d7a04a30a602307e3d.jpg`},caption:dec},{quoted:mek});

}catch(e){
console.log(e)
reply(`${e}`)
}
})
