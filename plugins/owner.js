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
| ᴡʜᴀᴛꜱᴀᴘᴘ ᴄʜᴀɴɴᴇʟ: 

©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ
`
await conn.sendMessage(from, {
            audio: { url: 'https://github.com/KEVIN-LEVIN-TECH/Hyper-md-voice/raw/refs/heads/main/auto_voice/ca15f4b2-da73-4901-90ad-6ed40b743bfe.mp3' },
            mimetype: 'audio/mp4',
            ptt: true
        }, { quoted: mek });
await conn.sendMessage(from,{image:{url: config.ALIVE_IMG},caption:dec},{quoted:mek});

}catch(e){
console.log(e)
reply(`${e}`)
}
})
