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

let dec = `👨‍💻 Hyper MD Repastitory Information

| ɴᴀᴍᴇ: Hyper-MD
| ᴏᴡɴᴇʀ: Mr Senesh (KEVIN)
| ɴᴜᴍʙᴇʀ: 94784337506
| ᴠᴇʀꜱɪᴏɴ: 1.0.0


📡 REPO LINK
🔗◦https://github.com/KEVIN-LEVIN-TECH/HYPER_MD-v1

📌 FOLLOW MY WHATSAPP CHANNEL
🔗◦https://whatsapp.com/channel/0029VamA19KFCCoY1q9cvn2I

©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ
`
return await conn.sendMessage(from,{image:{url: `https://i.ibb.co/tpJGQkr/20241122-203120.jpg` },caption:dec},{quoted:mek});
}catch(e){
console.log(e)
reply(`${e}`)
}
})
