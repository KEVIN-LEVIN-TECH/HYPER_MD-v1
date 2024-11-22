const config = require('../config')
const {cmd , commands} = require('../command')
const os = require("os")
const {runtime} = require('../lib/functions')
cmd({
    pattern: "system",
    alias: ["status","bitinfo"],
    desc: "Check up time , ram usage and more",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let status = `
┏━━━━━━━━━━━━━━━━━━━━━
┃Uptime:  ${runtime(process.uptime())}
┃Ram usage: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
┃HostName: ${os.hostname()}
┃Owner: Mr Senesh 
┗━━━━━━━━━━━━━━━━━━━━━
`
return reply(`${status}`)
await conn.sendMessage(from, {
            audio: { url: 'https://github.com/KEVIN-LEVIN-TECH/Hyper-md-voice/raw/refs/heads/main/auto_voice/ca15f4b2-da73-4901-90ad-6ed40b743bfe.mp3' },
            mimetype: 'audio/mp4',
            ptt: true
        }, { quoted: mek });
return await conn.sendMessage(from,{image: {url: config.ALIVE_IMG},caption: des},{quoted: mek})
}catch(e){

}catch(e){
console.log(e)
reply(`${e}`)

}
})
