const {readEnv} = require('../lib/database')
const {cmd , commands} = require('../command')

cmd({
    pattern: "menu",
    react: '📜',
    desc: "get cmd list",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const config = await readEnv();
let menu = {
main: '',
download: '',
group: '',
owner: '',
convert: '',
search: '',
}

for (let i = 0; i < commands.length; i++) {
if (commands[i].pattern && !commands[i].dontAddCommandList) {
menu[commands[i].category] += `${config.PREFIX}${commands[i].pattern}\n`;
 }
}

let madeMenu =`

 Hello 👋${pushname}
 
╭━━━━ Cᴏᴍᴍᴀᴍᴅꜱ Pᴀɴᴇʟ━━━━━━
│ Bot Owener: MrSenesh
│ Bot Name: Hyper MD
│ Prefix: [.]
│ Versions: 1.0.0
│ Whatsap Number: +94784337506
╰━━━━━━━━━━━━━━━━━━━ 

 Hʏᴘᴇʀ-MD Cᴏᴍᴍᴀᴍᴅꜱ Pᴀɴᴇʟ

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
`
await conn.sendMessage(from, {
            audio: { url: 'https://github.com/KEVIN-LEVIN-TECH/Hyper-md-voice/raw/refs/heads/main/auto_voice/ca15f4b2-da73-4901-90ad-6ed40b743bfe.mp3' },
            mimetype: 'audio/mp4',
            ptt: true
        }, { quoted: mek });
await conn.sendMessage(from,{image:{url: `https://github.com/KEVIN-LEVIN-TECH/HYPER_MD-v1/blob/main/midea/20241123_121425.jpg`},caption:madeMenu` },{quoted:mek})
    
}catch(e){
console.log(e);
reply(`${e}`)
}
})
