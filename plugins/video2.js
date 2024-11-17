const { cmd } = require('../command')
const { fetchJson } = require('../lib/functions')

const apilink = 'https://dark-yasiya-api-new.vercel.app' 

cmd({
    pattern: "video2",
    desc: "download videos.",
    category: "download",
    react: "📽️",
    filename: __filename
},
async(conn, mek, m,{from, reply, q}) => {
try{

if(!q) return reply('Give me song name or url !')
    
const search = await fetchJson(`${apilink}/search/yt?q=${q}`)
const data = search.result.data[0];
const url = data.url
    
const ytdl = await fetchJson(`${apilink}/download/ytmp4?url=${data.url}`)
    
let message = `‎‎       
📽️ Hyper-MD YT VIDEO DOWNLOADER 📽️


| ➤ ‎Title: ${data.title}
 
| ➤ Duration: ${data.timestamp}
 
| ➤ Uploaded: ${data.ago}
 
| ➤ Views: ${data.views}
 
| ➤ Author: ${data.author.name}
 
| ➤ Url: ${data.url}

©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ 
`
  
await conn.sendMessage(from, { image: { url : data.thumbnail }, caption: message }, { quoted : mek })
  
//send video + document message
await conn.sendMessage(from,{video: {url: ytdl.result.dl_link},mimetype:"video/mp4"},{quoted:mek})
await conn.sendMessage(from,{document: {url:ytdl.result.dl_link},mimetype:"video/mp4",fileName:data.title + ".mp4",caption:`©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ `},{quoted:mek})


} catch(e){
console.log(e)
reply(e)
}
})
