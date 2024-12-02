const config = require('../config')
const {cmd , commands} = require('../command')
const { fetchJson } = require('../lib/functions')

cmd({
    pattern: "ai",
    react: "🤖",
    desc: "ai chat",
    category: "ai",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let data = await fetchJson(`https://lkziko-api.onrender.com/api/ai/lennox?message=${q}&apiKey=LennoxGPT-8312b964-5228-4e1d-b1ac-08f405b431fa`)
return reply(`${data.response}`)
}catch(e){
console.log(e)
reply(`${e}`)
}
})
