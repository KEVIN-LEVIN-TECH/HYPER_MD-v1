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
await conn.sendMessage(from, {
            audio: { url: 'https://github.com/KEVIN-LEVIN-TECH/Hyper-md-voice/raw/refs/heads/main/auto_voice/ca15f4b2-da73-4901-90ad-6ed40b743bfe.mp3' },
            mimetype: 'audio/mp4',
            ptt: true
        }, { quoted: mek });
return await conn.sendMessage(from,{image:{url: `https://pomf2.lain.la/f/ozh9ihol.png`},caption:dec},{quoted:mek});
}catch(e){
console.log(e)
reply(`${e}`)
}
})
