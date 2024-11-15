const config = require('../config')
const { cmd, commands } = require('../command')
const { getRandom } = require('../lib/functions')
const fs = require('fs');
const path = require('path');
const fileType = require("file-type")
const { image2url } = require("@dark-yasiya/imgbb.js")

cmd({
    pattern: "img2url",
    react: "🔗",
    alias: ["tourl","imgurl","imgbb","imgtourl"],
    desc: 'It convert given image to url.',
    category: "other",
    use: '.img2url <reply image>',
    filename: __filename
},
async(conn, mek, m,{from, prefix, quoted, body, reply }) => {
    try{
      

  const isQuotedViewOnce = m.quoted ? (m.quoted.type === 'viewOnceMessage') : false
  const isQuotedImage = m.quoted ? ((m.quoted.type === 'imageMessage') || (isQuotedViewOnce ? (m.quoted.msg.type === 'imageMessage') : false)) : false
        
  if ((m.type === 'imageMessage') || isQuotedImage) {

  var nameJpg = getRandom('');
  let buff = isQuotedImage ? await m.quoted.download(nameJpg) : await m.download(nameJpg)
  let type = await fileType.fromBuffer(buff);
      
await fs.promises.writeFile(`./${nameJpg}.` + type.ext, buff);
const result = await image2url(`./${nameJpg}.` + type.ext);        
await reply(result.image.url)  
fs.unlinkSync(`./${nameJpg}.` + type.ext)
      
} else return reply("Please mention image !")        
} catch (e) {
console.log(e)
reply(e)
}
})

