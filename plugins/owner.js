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
| ʏᴏᴜᴛᴜʙᴇ: 
| ᴡʜᴀᴛꜱᴀᴘᴘ ᴄʜᴀɴɴᴇʟ: https://whatsapp.com/channel/0029VamA19KFCCoY1q9cvn2I

©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ
`
await conn.sendMessage(from,{image:{url: `https://i.ibb.co/3cmC926/20241123-124107.jpg` },caption:dec},{quoted:mek});
    const vcard = 'BEGIN:VCARD\n' // metadata of the contact card
            + 'VERSION:3.0\n' 
            + 'FN:Mr. Senesh\n'
            + 'ORG:Mr. Senesh\n'
            + 'TEL;type=CELL;type=VOICE;waid=94784337506:+94 78 433 7506\n'
            + 'EMAIL:senesh@gmail.com\n'
            + 'END:VCARD';
                        await conn.sendMessage(from, { 
        contacts: { 
            displayName: 'Mr. Senesh', 
            contacts: [{ vcard }] 
        }
    }
);

}catch(e){
console.log(e)
reply(`${e}`)
}
})
