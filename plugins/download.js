

const { tlang, ringtone, cmd,fetchJson, sleep, botpic,ffmpeg, getBuffer, pinterest, prefix, Config } = require('../lib')
const { mediafire } = require("../lib/mediafire.js");
const googleTTS = require("google-tts-api");
const ytdl = require('ytdl-secktor')
const fs = require('fs-extra')
var videotime = 60000 // 1000 min
var dlsize = 1000 // 1000mb


//---------------------------------------------------------------------------
cmd({
            pattern: "tts",
            desc: "text to speech.",
            category: "downloader",
            react: "✅",
            filename: __filename,
            use: '<Hii,this is vajira>',
        },
        async(Void, citel, text) => {
            if (!text) return citel.reply('Please give me a Sentence to change into audio.')
            let texttts = text
            const ttsurl = googleTTS.getAudioUrl(texttts, {
                lang: "en",
                slow: false,
                host: "https://translate.google.com",
            });
            return Void.sendMessage(citel.chat, {
                audio: {
                    url: ttsurl,
                },
                mimetype: "audio/mpeg",
                fileName: `ttsCitelVoid.m4a`,
            }, {
                quoted: citel,
            });
        }

    )
     //---------------------------------------------------------------------------
cmd({ 
             pattern: "tiktok", 
               alias :  ['tt','ttdl','ටික්ටොක්'], 
             desc: "Downloads Tiktok Videos Via Url.", 
             category: "downloader", 
             react: "🎟️",
             filename: __filename, 
             use: '<add tiktok url.>' 
         }, 
  
         async(Void, citel, text) => { 
  if(!text) return await citel.reply(`*Uhh Please, Provide me tiktok Video Url*`); 
  let txt = text ? text.split(" ")[0]:''; 
  if (!/tiktok/.test(txt)) return await citel.reply(`*Uhh Please, Give me Valid Tiktok Video Url!*`); 
  const { status ,thumbnail, video, audio } = await tiktokdl(txt) 
  //console.log("url : " , video  ,"\nThumbnail : " , thumbnail ,"\n Audio url : " , audio ) 
  if (status) return await Void.sendMessage(citel.chat, {video : {url : video } , caption: "©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ " } , {quoted : citel }); 
  else return await citel.reply("Error While Downloading Your Video")  
 }) 
     //---------------------------------------------------------------------------

     cmd({
        pattern: "yts",
        desc: "Gives descriptive info of query from youtube..",
        category: "downloader",
        react: "🎶",
        filename: __filename,
        use: '<yt search text>',
    },
    async(Void, citel, text) => {
        let yts = require("secktor-pack");
        if (!text) return citel.reply(`Example : ${prefix}yts ${tlang().title} WhatsApp Bot`);
        let search = await yts(text);
        let textt = "*YouTube Search*\n\n Result From " + text + "\n\n───────────────────\n";
        let no = 1;
        for (let i of search.all) {
            textt += `⚡ No : ${no++}\n ❤Title : ${i.title}\n♫ Type : ${
      i.type
    }\n👾Views : ${i.views}\n⌛Duration : ${
      i.timestamp
    }\n⬆️Upload At : ${i.ago}\n👑Author : ${i.author.name}\n🎵Url : ${
      i.url
    }\n\n──────────────\n\n`;
        }
        return Void.sendMessage(citel.chat, {
            image: {
                url: search.all[0].thumbnail,
            },
            caption: textt,
        }, {
            quoted: citel,
        });
    }
)
    //---------------------------------------------------------------------------
cmd({
            pattern: "video",
            desc: "Downloads video from yt.",
            category: "downloader",
            react: "🎥",
            filename: __filename,
            use: '<808-juice wrld >',
        },
        async(Void, citel, text) => {
            let yts = require("secktor-pack");
            let search = await yts(text);
            let anu = search.videos[0];
            let urlYt = anu.url
            const getRandom = (ext) => {
                return `${Math.floor(Math.random() * 10000)}${ext}`;
            };
                let infoYt = await ytdl.getInfo(urlYt);
                if (infoYt.videoDetails.lengthSeconds >= videotime) return citel.reply(`😔 Video file too big!`);
                let titleYt = infoYt.videoDetails.title;
                let randomName = getRandom(".mp4");
                citel.reply('*📥➣Downloading:* '+titleYt)
                const stream = ytdl(urlYt, {
                        filter: (info) => info.itag == 22 || info.itag == 18,
                    })
                    .pipe(fs.createWriteStream(`./${randomName}`));
                await new Promise((resolve, reject) => {
                    stream.on("error", reject);
                    stream.on("finish", resolve);
                });
                let stats = fs.statSync(`./${randomName}`);
                let fileSizeInBytes = stats.size;
                let fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
                if (fileSizeInMegabytes <= dlsize) {
                    let buttonMessage = {
                        video: fs.readFileSync(`./${randomName}`),
                        jpegThumbnail: log0,
                        mimetype: 'video/mp4',
                        fileName: `${titleYt}.mp4`,
                        caption: ` ✅─ඔබ ඉල්ලූ වීඩියෝව─✅\n───⦁⇆ㅤ ||◁ㅤ❚❚ㅤ▷||ㅤ ↻⦁──\n\n📌➣Title : ${titleYt}\n 📍➣File Size : ${fileSizeInMegabytes} MB\n👤➣Author: ${anu.author.name}\n📥➣Uploaded: ${anu.ago}\n🕐➣Duration: ${anu.timestamp}\n👥➣Viewers:* ${anu.views}\n\n©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ `,
                        headerType: 4,
                        contextInfo: {
                            externalAdReply: {
                                title: titleYt,
                                body: citel.pushName,
                                thumbnail: await getBuffer(search.all[0].thumbnail),
                                renderLargerThumbnail: true,
                                mediaType: 2,
                                mediaUrl: search.all[0].thumbnail,
                                sourceUrl: search.all[0].thumbnail
                            }
                        }
                    }
                 Void.sendMessage(citel.chat, buttonMessage, { quoted: citel })
                 return fs.unlinkSync(`./${randomName}`);
                } else {
                    citel.reply(`😔 File size bigger than 100mb.`);
                }
                return fs.unlinkSync(`./${randomName}`);      


        }
    )
    //---------------------------------------------------------------------------
cmd({ 
             pattern: "video2", 
            alias :['විඩියො','vd'],
             desc: "Downloads video from yt.", 
             category: "downloader", 
             filename: __filename, 
             use: '<faded-Alan Walker>', 
         }, 
         async(Void, citel, text) => { 
 Void.sendMessage(citel.chat, {  
               react: {  
                   text: "🎥",  
                   key: citel.key  
               }  
           })  
             let yts = require("secktor-pack"); 
             let search = await yts(text); 
             let anu = search.videos[0]; 
             let urlYt = anu.url 
             const getRandom = (ext) => { 
                 return `${Math.floor(Math.random() * 10000)}${ext}`; 
             }; 
                 let infoYt = await ytdl.getInfo(urlYt); 
                 if (infoYt.videoDetails.lengthSeconds >= videotime) return citel.reply(`❌ Video file too big!`); 
                 let titleYt = infoYt.videoDetails.title; 
                 let randomName = getRandom(".mp4"); 
                 citel.reply('🔎 Search Your Video.') 
                 const stream = ytdl(urlYt, { 
                         filter: (info) => info.itag == 22 || info.itag == 18, 
                     }) 
                     .pipe(fs.createWriteStream(`./${randomName}`)); 
                 await new Promise((resolve, reject) => { 
                     stream.on("error", reject); 
                     stream.on("finish", resolve); 
                 }); 
                 let stats = fs.statSync(`./${randomName}`); 
                 let fileSizeInBytes = stats.size; 
                 let fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024); 
                 if (fileSizeInMegabytes <= dlsize) { 
  let thumbnaill = search.all[0].thumbnail; 
   let caption = `✍️title : ${search.all[0].title}
   
 📝 description : ${search.all[0].description}
  
 🖇️ url: ${search.all[0].url}
  
 📚 Author: ${search.all[0].author}
  
 ⏳ duration: ${search.all[0].duration}
  
 🧑‍💻 type :
  .video ${search.all[0].url}  to get video`
  
  let butnMessage = {
                        image: {
                            url: thumbnaill,
                        },
                        caption: caption,
                        headerType: 4,
                    };
                    Void.sendMessage(citel.chat, butnMessage, {
                        quoted: citel,
                    });
await sleep(2000);
                         let buttonMessage = {  
                          video: fs.readFileSync(`./${randomName}`),
                          jpegThumbnail: log0,
                          mimetype: 'video/mp4',  
                          fileName: `${titleYt}.mp4`, 
                          caption: `*⬇️ Download video*`, 
                      }  
                   Void.sendMessage(citel.chat, buttonMessage, { quoted: citel }); 
  
                  return fs.unlinkSync(`./${randomName}`); 
                 } else { 
                     citel.reply(`❌ File size bigger than 100mb.`); 
                 } 
                 return fs.unlinkSync(`./${randomName}`);       
  
  
         } 
     )



    //---------------------------------------------------------------------------
cmd({
            pattern: "play",
            desc: "Sends info about the query(of youtube video/audio).",
            category: "downloader",
            react: "🎶",
            filename: __filename,
            use: '<faded-Alan walker.>',
        },
        async(Void, citel, text) => {
            if (!text) return citel.reply(`Use ${command} Back in Black`);
            let yts = require("secktor-pack");
            let search = await yts(text);
            let anu = search.videos[0];
            let buttonMessage = {
                image: {
                    url: anu.thumbnail,
                },
                caption: `
╔═════════•∞•═╗
│⿻ ${tlang().title} 
│  *Youtube Player* ✨
│⿻ *Title:* ${anu.title}
│⿻ *Duration:* ${anu.timestamp}
│⿻ *Viewers:* ${anu.views}
│⿻ *Uploaded:* ${anu.ago}
│⿻ *Author:* ${anu.author.name}
╚═•∞•═════════╝
⦿ *Url* : ${anu.url}
`,
                footer: tlang().footer,
                headerType: 4,
            };
            return Void.sendMessage(citel.chat, buttonMessage, {
                quoted: citel,
            });

        }
    )
    //---------------------------------------------------------------------------
cmd({
            pattern: "ringtone",
            desc: "Downloads ringtone.",
            category: "downloader",
            react: "🎶",
            filename: __filename,
            use: '<ringtone name>',
        },
        async(Void, citel, text) => {
            if (!text) return citel.reply(`Example: ${prefix}ringtone back in black`)
            let anu = await ringtone(text)
            let result = anu[Math.floor(Math.random() * anu.length)]
            return Void.sendMessage(citel.chat, { audio: { url: result.audio }, fileName: result.title + '.mp3', mimetype: 'audio/mpeg' }, { quoted: citel })
        }
    )
    //---------------------------------------------------------------------------
cmd({
            pattern: "pint",
            desc: "Downloads image from pinterest.",
            category: "downloader",
            react: "✅",
            filename: __filename,
            use: '<text|image name>',
        },
        async(Void, citel, text) => {
            if (!text) return reply("What picture are you looking for?") && Void.sendMessage(citel.chat, {
                react: {
                    text: '❌',
                    key: citel.key
                }
            })
            try {
                anu = await pinterest(text)
                result = anu[Math.floor(Math.random() * anu.length)]
                let buttonMessage = {
                    image: {
                        url: result
                    },
                    caption: ` `,
                    footer: tlang().footer,
                    headerType: 4,
                    contextInfo: {
                        externalAdReply: {
                            title: `Here you go✨`,
                            body: `${Config.ownername}`,
                            thumbnail: log0,
                            mediaType: 2,
                            mediaUrl: ``,
                            sourceUrl: ``
                        }
                    }
                }
                return Void.sendMessage(citel.chat, buttonMessage, {
                    quoted: citel
                })
            } catch (e) {
                console.log(e)
            }
        })

    //---------------------------------------------------------------------------
cmd({
            pattern: "song",
	    alias :['audio'],
            react: "🎧",
            desc: "Downloads audio from youtube.",
            category: "downloader",
            filename: __filename,
            use: '<text>',
        },
        async(Void, citel, text) => {
            let yts = require("secktor-pack"); 
let textYt;        
if (text.startsWith("https://youtube.com/shorts/")) {
  const svid = text.replace("https://youtube.com/shorts/", "https://youtube.com/v=");
  const s2vid = svid.split("?feature")[0];
  textYt = s2vid;
} else {
  textYt = text;
}
            let search = await yts(textYt);
            let anu = search.videos[0];
                       let buttonMessaged ={
             image: {
                    url: anu.thumbnail,
               },
                caption: `
───────➢───────
 🎧HYPER MD🎧
┋👩‍🎨 ${tlang().title} 
┋🚨 *Youtube Player* ✨
 ╼━━━━━➢━━━━━━╾
┋🗒️ *Title:* ${anu.title}

┋⏳ *Duration:* ${anu.timestamp}
┋👀 *Viewers:* ${anu.views}
┋📤 *Uploaded:* ${anu.ago}
┋🧑‍🎤 *Author:* ${anu.author.name}
┋⬇️ Upload To Song
 ───────➢────────
⦿ *Url* : ${anu.url}
`,			
                footer: tlang().footer,
                headerType: 4,
            };
            await Void.sendMessage(citel.chat, buttonMessaged, {
                quoted: citel,
            });

            
            const getRandom = (ext) => {
                return `${Math.floor(Math.random() * 10000)}${ext}`;
            };
            let infoYt = await ytdl.getInfo(anu.url);
            if (infoYt.videoDetails.lengthSeconds >= videotime) return citel.reply(`❌ Video file too big!`);
            let titleYt = infoYt.videoDetails.title;
            let randomName = getRandom(".mp3");
 /*           citel.reply(`
╔───────────────◆
┊🧚 ${tlang().title} 
┊🚨 *Youtube Player* ✨
┊ ┉━━━━◭☬◮━━━━━┉
┊🎀 *Title:* ${anu.title}
┊🌐 *Duration:* ${anu.timestamp}
┊👀 *Viewers:* ${anu.views}
┊⬆️ *Uploaded:* ${anu.ago}
┊👽 *Author:* ${anu.author.name}
╚────────────────◆
⦿ *Url* : ${anu.url}`,)
*/
            const stream = ytdl(anu.url, {
                    filter: (info) => info.audioBitrate == 160 || info.audioBitrate == 128,
                })
                .pipe(fs.createWriteStream(`./${randomName}`));
            await new Promise((resolve, reject) => {
                stream.on("error", reject);
                stream.on("finish", resolve);
            });

            let stats = fs.statSync(`./${randomName}`);
            let fileSizeInBytes = stats.size;
            let fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
            if (fileSizeInMegabytes <= dlsize) {
                let buttonMessage = {
                    audio: fs.readFileSync(`./${randomName}`),
                    mimetype: 'audio/mpeg',
                    fileName: titleYt + ".mp3",
                    headerType: 4,
                    contextInfo: {
                        externalAdReply: {
                            title: titleYt,
                            body: citel.pushName,
                            renderLargerThumbnail: false,
                            thumbnailUrl: search.all[0].thumbnail,
                            mediaUrl: anu.url,
                            mediaType: 1,
                            thumbnail: await getBuffer(search.all[0].thumbnail),
                            sourceUrl: anu.url,
                        },
                    },
                }
                await Void.sendMessage(citel.chat, buttonMessage, { quoted: citel })
                return fs.unlinkSync(`./${randomName}`);
            } else {
                citel.reply(`❌ File size bigger than 100mb.`);
            }
            fs.unlinkSync(`./${randomName}`);
            


        }
    )
     //---------------------------------------------------------------------------
cmd({
            pattern: "song2",
            desc: "Downloads audio from youtube.",
            category: "downloader",
            react: "🎶",
            filename: __filename,
            use: '<text>',
        },
        async(Void, citel, text) => {
            let yts = require("secktor-pack");
            let search = await yts(text);
            let anu = search.videos[0];
            const getRandom = (ext) => {
                return `${Math.floor(Math.random() * 10000)}${ext}`;
            };
            let infoYt = await ytdl.getInfo(anu.url);
            if (infoYt.videoDetails.lengthSeconds >= videotime) return citel.reply(`😔 Video file too big!`);
            let titleYt = infoYt.videoDetails.title;
            let randomName = getRandom(".mp3");
            citel.reply('*📥➣Downloadig:* '+titleYt)
            const stream = ytdl(anu.url, {
                    filter: (info) => info.audioBitrate == 160 || info.audioBitrate == 128,
                })
                .pipe(fs.createWriteStream(`./${randomName}`));
            await new Promise((resolve, reject) => {
                stream.on("error", reject);
                stream.on("finish", resolve);
            });

            let stats = fs.statSync(`./${randomName}`);
            let fileSizeInBytes = stats.size;
            let fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
            if (fileSizeInMegabytes <= dlsize) {
                let buttonMessage = {
                    audio: fs.readFileSync(`./${randomName}`),
                    mimetype: 'audio/mpeg',
                    fileName: titleYt + ".mp3",
                    headerType: 4,
                    contextInfo: {
                        externalAdReply: {
                            title: titleYt,
                            body: citel.pushName,
                            renderLargerThumbnail: true,
                            thumbnailUrl: search.all[0].thumbnail,
                            mediaUrl: text,
                            mediaType: 1,
                            thumbnail: await getBuffer(search.all[0].thumbnail),
                            sourceUrl: text,
                        },
                    },
                }
                await Void.sendMessage(citel.chat, buttonMessage, { quoted: citel })
                return fs.unlinkSync(`./${randomName}`);
            } else {
                citel.reply(`❌ File size bigger than 100mb.`);
            }
            fs.unlinkSync(`./${randomName}`);
            


        }
    )
     
    //---------------------------------------------------------------------------

cmd({
            pattern: "ytmp4",
            desc: "Downloads video from youtube.",
            category: "downloader",
            react: "🎶",
            filename: __filename,
            use: '<yt video url>',
        },
        async(Void, citel, text) => {
            const getRandom = (ext) => {
                return `${Math.floor(Math.random() * 10000)}${ext}`;
            };
            if (!text) {
                citel.reply(`❌Please provide me a url`);
                return;
            }
            try {
                let urlYt = text;
                if (!urlYt.startsWith("http")) return citel.reply(`❌ Give youtube link!`);
                let infoYt = await ytdl.getInfo(urlYt);
                if (infoYt.videoDetails.lengthSeconds >= videotime) return citel.reply(`❌ Video file too big!`);
                let titleYt = infoYt.videoDetails.title;
                let randomName = getRandom(".mp4");

                const stream = ytdl(urlYt, {
                        filter: (info) => info.itag == 22 || info.itag == 18,
                    })
                    .pipe(fs.createWriteStream(`./${randomName}`));
                await new Promise((resolve, reject) => {
                    stream.on("error", reject);
                    stream.on("finish", resolve);
                });
                let stats = fs.statSync(`./${randomName}`);
                let fileSizeInBytes = stats.size;
                let fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
                if (fileSizeInMegabytes <= dlsize) {
                    let yts = require("secktor-pack");
                    let search = await yts(text);
                    let buttonMessage = {
                        video: fs.readFileSync(`./${randomName}`),
                        jpegThumbnail: log0,
                        mimetype: 'video/mp4',
                        fileName: `${titleYt}.mp4`,
                        caption: ` ⿻ Title : ${titleYt}\n ⿻ File Size : ${fileSizeInMegabytes} MB`,
                        headerType: 4,
                        contextInfo: {
                            externalAdReply: {
                                title: titleYt,
                                body: citel.pushName,
                                thumbnail: await getBuffer(search.all[0].thumbnail),
                                renderLargerThumbnail: true,
                                mediaType: 2,
                                mediaUrl: search.all[0].thumbnail,
                                sourceUrl: search.all[0].thumbnail
                            }
                        }
                    }
                 Void.sendMessage(citel.chat, buttonMessage, { quoted: citel })
                 return fs.unlinkSync(`./${randomName}`);
                } else {
                    citel.reply(`❌ File size bigger than 100mb.`);
                }
                return fs.unlinkSync(`./${randomName}`);      
            } catch (e) {
                console.log(e)
            }
        }
    )
    //---------------------------------------------------------------------------
cmd({
        pattern: "ytmp3",
        desc: "Downloads audio by yt link.",
        category: "downloader",
        react: "🎶",
        use: '<yt video url>',
    },
    async(Void, citel, text) => {
        const getRandom = (ext) => {
            return `${Math.floor(Math.random() * 10000)}${ext}`;
        };

        if (text.length === 0) {
            reply(`❌ URL is empty! \nSend ${prefix}ytmp3 url`);
            return;
        }
        try {
            let urlYt = text;
            if (!urlYt.startsWith("http")) {
                citel.reply(`❌ Give youtube link!`);
                return;
            }
            let infoYt = await ytdl.getInfo(urlYt);
            //30 MIN
            if (infoYt.videoDetails.lengthSeconds >= videotime) {
                reply(`❌ I can't download that long video!`);
                return;
            }
            let titleYt = infoYt.videoDetails.title;
            let randomName = getRandom(".mp3");
            const stream = ytdl(urlYt, {
                    filter: (info) => info.audioBitrate == 160 || info.audioBitrate == 128,
                })
                .pipe(fs.createWriteStream(`./${randomName}`));
            await new Promise((resolve, reject) => {
                stream.on("error", reject);
                stream.on("finish", resolve);
            });

            let stats = fs.statSync(`./${randomName}`);
            let fileSizeInBytes = stats.size;
            let fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
            if (fileSizeInMegabytes <= dlsize) {
                let yts = require("secktor-pack");
                let search = await yts(text);
                let buttonMessage = {
                    audio: fs.readFileSync(`./${randomName}`),
                    mimetype: 'audio/mpeg',
                    fileName: titleYt + ".mp3",
                    headerType: 4,
                    contextInfo: {
                        externalAdReply: {
                            title: titleYt,
                            body: citel.pushName,
                            renderLargerThumbnail: true,
                            thumbnailUrl: search.all[0].thumbnail,
                            mediaUrl: text,
                            mediaType: 1,
                            thumbnail: await getBuffer(search.all[0].thumbnail),
                            sourceUrl: text,
                        },
                    },
                }
                await Void.sendMessage(citel.chat, buttonMessage, { quoted: citel })
                return fs.unlinkSync(`./${randomName}`);
            } else {
                citel.reply(`❌ File size bigger than 100mb.`);
            }
            fs.unlinkSync(`./${randomName}`);
        } catch (e) {
            console.log(e)
        }

    }
)

  //---------------------------------------------------------------------------
cmd({
        pattern: "ytdoc",
        desc: "Downloads audio by yt link as document.",
        category: "downloader",
        react: "🎶",
        use: '<ytdoc video url>',
    },
    async(Void, citel, text) => {
        const getRandom = (ext) => {
            return `${Math.floor(Math.random() * 10000)}${ext}`;
        };

        if (text.length === 0) {
            reply(`❌ URL is empty! \nSend ${prefix}ytmp3 url`);
            return;
        }
        try {
            let urlYt = text;
            if (!urlYt.startsWith("http")) {
                citel.reply(`❌ Give youtube link!`);
                return;
            }
            let infoYt = await ytdl.getInfo(urlYt);
            //30 MIN
            if (infoYt.videoDetails.lengthSeconds >= videotime) {
                reply(`❌ I can't download that long video!`);
                return;
            }
            let titleYt = infoYt.videoDetails.title;
            let randomName = getRandom(".mp3");
            const stream = ytdl(urlYt, {
                    filter: (info) => info.audioBitrate == 160 || info.audioBitrate == 128,
                })
                .pipe(fs.createWriteStream(`./${randomName}`));
            await new Promise((resolve, reject) => {
                stream.on("error", reject);
                stream.on("finish", resolve);
            });

            let stats = fs.statSync(`./${randomName}`);
            let fileSizeInBytes = stats.size;
            let fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
            if (fileSizeInMegabytes <= dlsize) {
                let yts = require("secktor-pack");
                let search = await yts(text);
                let buttonMessage = {
                    document: fs.readFileSync(`./${randomName}`),
                    mimetype: 'audio/mpeg',
                    fileName: titleYt + ".mp3",
                    headerType: 4,
                    contextInfo: {
                        externalAdReply: {
                            title: titleYt,
                            body: citel.pushName,
                            renderLargerThumbnail: true,
                            thumbnailUrl: search.all[0].thumbnail,
                            mediaUrl: text,
                            mediaType: 1,
                            thumbnail: await getBuffer(search.all[0].thumbnail),
                            sourceUrl: text,
                        },
                    },
                }
                await Void.sendMessage(citel.chat, buttonMessage, { quoted: citel })
                return fs.unlinkSync(`./${randomName}`);
            } else {
                citel.reply(`❌ File size bigger than 100mb.`);
            }
            fs.unlinkSync(`./${randomName}`);
        } catch (e) {
            console.log(e)
        }

    }
)
