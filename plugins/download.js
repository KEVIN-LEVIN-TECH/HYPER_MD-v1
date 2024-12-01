// 01. Song DL |       0006
// 02. Video DL |      0140

const axios = require("axios");
const fs = require("fs").promises; // Use fs.promises for async file operations
const whois = require("whois");
const { tiktokdl } = require("tiktokdl");
const path = require("path");
const config = require("../config");
const zxcvbn = require("zxcvbn");
const crypto = require("crypto");
const dyluxApi = require("api-dylux");
const cheerio = require("cheerio");
const https = require("https");
const { pipeline } = require("stream");
const { promisify } = require("util");
const streamPipeline = promisify(pipeline);
const NineGag = require("9gag");
const Scraper = NineGag.Scraper;
const { Buffer } = require("buffer");
const os = require("os");
const {
    getBuffer,
    getGroupAdmins,
    getRandom,
    h2k,
    isUrl,
    Json,
    fetchJson,
    runtime,
    sleep,
} = require("../lib/functions");
const mysteryItems = [
    "A shiny new toy!",
    "A magical potion!",
    "A golden coin!",
    "A rare gem!",
    "An ancient scroll!",
    "A secret message!",
    "A beautiful flower!",
    "A cute plushie!",
    "A special key!",
    "A futuristic gadget!",
];
const morseCodeMap = {
    A: ".-",
    B: "-...",
    C: "-.-.",
    D: "-..",
    E: ".",
    F: "..-.",
    G: "--.",
    H: "....",
    I: "..",
    J: ".---",
    K: "-.-",
    L: ".-..",
    M: "--",
    N: "-.",
    O: "---",
    P: ".--.",
    Q: "--.-",
    R: ".-.",
    S: "...",
    T: "-",
    U: "..-",
    V: "...-",
    W: ".--",
    X: "-..-",
    Y: "-.--",
    Z: "--..",
    1: ".----",
    2: "..---",
    3: "...--",
    4: "....-",
    5: ".....",
    6: "-....",
    7: "--...",
    8: "---..",
    9: "----.",
    0: "-----",
    " ": "/",
};
const math = require("mathjs");
const PASTEBIN_API_KEY = config.PASTEBIN_API_KEY;
const dns = require("dns");
const {
    Sticker,
    createSticker,
    StickerTypes,
} = require("wa-sticker-formatter");
const gsmarena = require("gsmarena-api");
const mono = "```";
const sai = "6467ad0b29";
const fetch = require("node-fetch");
const API_URL = "https://api.polygon.io/v2/reference/news";
const API_KEY = "Y4iTYoJANwppB8I3Bm4QVWdV5oXlvc45";
const API2_URL = "https://api.polygon.io/v1/marketstatus/now";
const CRIC_URL = "https://api.cricapi.com/v1/currentMatches";
const CRIC_KEY = "f68d1cb5-a9c9-47c5-8fcd-fbfe52bace78";
const API_BASE_URL = "https://api.memegen.link";
const Esana = require("@sl-code-lords/esana-news");
const api = new Esana();
const { IOSNEWS } = require("ios-news");
const apisg = "https://prabath-md-api.up.railway.app/api/";

//==============   SONG DL   ==============//

const { cmd, commands } = require("../command");
const fg = require("api-dylux");
const yts = require("yt-search");
const pdfUrl = "https://telegra.ph/file/3c64b5608dd82d33dabe8.jpg";

// Function to extract the video ID from youtu.be or YouTube links
function extractYouTubeId(url) {
    const regex =
        /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/|playlist\?list=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

// Function to convert any YouTube URL to a full YouTube watch URL
function convertYouTubeLink(q) {
    const videoId = extractYouTubeId(q);
    if (videoId) {
        return "https://www.youtube.com/watch?v=${videoId}";
    }
    return q;
}

cmd(
    {
        pattern: "song2",
        desc: "To download songs.",
        react: "🎧",
        category: "download",
        filename: __filename,
    },
    async (
        conn,
        mek,
        m,
        {
            from,
            quoted,
            body,
            isCmd,
            command,
            args,
            q,
            isGroup,
            sender,
            senderNumber,
            botNumber2,
            botNumber,
            pushname,
            isMe,
            isOwner,
            groupMetadata,
            groupName,
            participants,
            groupAdmins,
            isBotAdmins,
            isAdmins,
            reply,
        },
    ) => {
        try {
            if (!q)
                return reply("𝖯𝗅𝖾𝖺𝗌𝖾 𝖦𝗂𝗏𝖾 𝖬𝖾 𝖯𝗋𝗈𝗏𝗂𝖽𝖾 `𝖲𝗈𝗇𝗀 𝖳𝖺𝗍𝗂𝗅𝖾 𝖮𝗋 𝖴𝗋𝗅` ❗");

            q = q;
            const search = await yts(q);
            const data = search.videos[0];
            const url = data.url;

            let desc = `乂 HYPER-MD SONG DOWNLOADER

⚙️ 𝖳𝗂𝗍𝗅𝖾 : ${data.title}
📃 𝖣𝖾𝗌𝖼𝗋𝗂𝗉𝗍𝗂𝗈𝗇 : ${data.description}
🚀 𝖵𝗂𝖾𝗐𝗌 : ${data.views}
⏰ 𝖣𝗎𝗋𝖺𝗍𝗂𝗈𝗇 : ${data.timestamp}
📆 𝖴𝗉𝗅𝗈𝖺𝖽𝖾𝖽 𝖮𝗇 : ${data.ago}
🎬 𝖢𝗁𝖺𝗇𝗇𝖾𝗅 : ${data.author.name}
🖇️ 𝖴𝗋𝗅 : ${data.url}

乂 REPLY THE DOWNLOAD OPTION  

1 ||  𝖣𝗈𝗐𝗇𝗅𝗈𝖺𝖽 : 𝖠𝗎𝖽𝗂𝗈 𝖳𝗒𝗉𝖾
2 ||  𝖣𝗈𝗐𝗇𝗅𝗈𝖺𝖽 : 𝖣𝗈𝖼𝗎𝗆𝖾𝗇𝗍 𝖳𝗒𝗉𝖾

> ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ `;

            // Send the song info with context
            const sentMsg = await conn.sendMessage(
                from,
                {
                    text: desc,
                    contextInfo: {
                        forwardingScore: 999,
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterName: "HYPER-MD",
                            newsletterJid: "120363325937635174@newsletter",
                        },
                        externalAdReply: {
                            title: `HYPER-MD Song Downloader`,
                            body: `${data.title} : ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ  Song Information Search Engine`,
                            thumbnailUrl: data.thumbnail,
                            sourceUrl: ``,
                            mediaType: 1,
                            renderLargerThumbnail: true,
                        },
                    },
                },
                { quoted: mek },
            );

            const messageID = sentMsg.key.id; // Save the message ID for later reference

            // Listen for the user's response
            conn.ev.on("messages.upsert", async (messageUpdate) => {
                const mek = messageUpdate.messages[0];
                if (!mek.message) return;
                const messageType =
                    mek.message.conversation ||
                    mek.message.extendedTextMessage?.text;
                const from = mek.key.remoteJid;
                const sender = mek.key.participant || mek.key.remoteJid;

                // Check if the message is a reply to the previously sent message
                const isReplyToSentMsg =
                    mek.message.extendedTextMessage &&
                    mek.message.extendedTextMessage.contextInfo.stanzaId ===
                        messageID;

                if (isReplyToSentMsg) {
                    // React to the user's reply (the "1" or "2" message)
                    await conn.sendMessage(from, {
                        react: { text: "", key: mek.key },
                    });

                    if (messageType === "1" || messageType === "2") {
                        const down = await fg.yta(url);
                        const downloadUrl = down.dl_url;

                        // React to the upload (sending the file)
                        await conn.sendMessage(from, {
                            react: { text: "", key: mek.key },
                        });

                        if (messageType === "1") {
                            // Handle option 1 (Audio File)
                            await conn.sendMessage(
                                from,
                                {
                                    audio: { url: downloadUrl },
                                    mimetype: "audio/mpeg",
                                    caption: `> ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ `,
                                },
                                { quoted: mek },
                            );
                        } else if (messageType === "2") {
                            // Handle option 2 (Document File)
                            await conn.sendMessage(
                                from,
                                {
                                    document: { url: downloadUrl },
                                    mimetype: "audio/mpeg",
                                    fileName: `ʜʏᴘᴇʀ-ᴍᴅ v1.0.0 | ${data.title}.mp3`,
                                    caption: `> ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ `,
                                },
                                { quoted: mek },
                            );
                        }

                        // React to the successful completion of the task
                        await conn.sendMessage(from, {
                            react: { text: "", key: mek.key },
                        });

                        console.log("Response sent successfully");
                    } else {
                        // Handle invalid input (not 1 or 2)
                        await conn.sendMessage(from, {
                            react: { text: "❓", key: mek.key },
                        });
                        reply("𝖯𝗅𝖾𝖺𝗌𝖾 𝖤𝗇𝗍𝖾𝗋 `𝖵𝖺𝗅𝗂𝖽 𝖮𝗉𝗍𝗂𝗈𝗇 1 𝖮𝗋 2` ❗");
                    }
                }
            });
        } catch (e) {
            console.log(e);
            reply("𝖯𝗅𝖾𝖺𝗌𝖾 𝖦𝗂𝗏𝖾 𝖬𝖾 𝖯𝗋𝗈𝗏𝗂𝖽𝖾 `𝖲𝗈𝗇𝗀 𝖳𝖺𝗍𝗂𝗅𝖾 𝖮𝗋 𝖴𝗋𝗅` ❗");
        }
    },
);

//==============   VIDEO DL   ==============//

cmd(
    {
        pattern: "video",
        desc: "To download songs.",
        react: "🎬",
        category: "download",
        filename: __filename,
    },
    async (
        conn,
        mek,
        m,
        {
            from,
            quoted,
            body,
            isCmd,
            command,
            args,
            q,
            isGroup,
            sender,
            senderNumber,
            botNumber2,
            botNumber,
            pushname,
            isMe,
            isOwner,
            groupMetadata,
            groupName,
            participants,
            groupAdmins,
            isBotAdmins,
            isAdmins,
            reply,
        },
    ) => {
        try {
            if (!q)
                return reply("𝖯𝗅𝖾𝖺𝗌𝖾 𝖦𝗂𝗏𝖾 𝖬𝖾 𝖯𝗋𝗈𝗏𝗂𝖽𝖾 `𝖵𝗂𝖽𝖾𝗈 𝖳𝖺𝗍𝗂𝗅𝖾 𝖮𝗋 𝖴𝗋𝗅` ❗");

            q = q;
            const search = await yts(q);
            const data = search.videos[0];
            const url = data.url;

            let desc = `乂 HYPER-MD VIDEO DOWNLOADER

⚙️ 𝖳𝗂𝗍𝗅𝖾 : ${data.title}
📃 𝖣𝖾𝗌𝖼𝗋𝗂𝗉𝗍𝗂𝗈𝗇 : ${data.description}
🚀 𝖵𝗂𝖾𝗐𝗌 : ${data.views}
⏰ 𝖣𝗎𝗋𝖺𝗍𝗂𝗈𝗇 : ${data.timestamp}
📆 𝖴𝗉𝗅𝗈𝖺𝖽𝖾𝖽 𝖮𝗇 : ${data.ago}
🎬 𝖢𝗁𝖺𝗇𝗇𝖾𝗅 : ${data.author.name}
🖇️ 𝖴𝗋𝗅 : ${data.url}

乂 REPLY THE DOWNLOAD OPTION  

1 ||  𝖣𝗈𝗐𝗇𝗅𝗈𝖺𝖽 : Video 𝖳𝗒𝗉𝖾
2 ||  𝖣𝗈𝗐𝗇𝗅𝗈𝖺𝖽 : 𝖣𝗈𝖼𝗎𝗆𝖾𝗇𝗍 𝖳𝗒𝗉𝖾

> ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ `;

            // Send the song info with context
            const sentMsg = await conn.sendMessage(
                from,
                {
                    text: desc,
                    contextInfo: {
                        forwardingScore: 999,
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterName: "HYPER-MD",
                            newsletterJid: "120363325937635174@newsletter",
                        },
                        externalAdReply: {
                            title: `HYPER-MD Video Downloader`,
                            body: `${data.title} : ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ  Song Information Search Engine`,
                            thumbnailUrl: data.thumbnail,
                            sourceUrl: ``,
                            mediaType: 1,
                            renderLargerThumbnail: true,
                        },
                    },
                },
                { quoted: mek },
            );

            const messageID = sentMsg.key.id; // Save the message ID for later reference

            // Listen for the user's response
            conn.ev.on("messages.upsert", async (messageUpdate) => {
                const mek = messageUpdate.messages[0];
                if (!mek.message) return;
                const messageType =
                    mek.message.conversation ||
                    mek.message.extendedTextMessage?.text;
                const from = mek.key.remoteJid;
                const sender = mek.key.participant || mek.key.remoteJid;

                // Check if the message is a reply to the previously sent message
                const isReplyToSentMsg =
                    mek.message.extendedTextMessage &&
                    mek.message.extendedTextMessage.contextInfo.stanzaId ===
                        messageID;

                if (isReplyToSentMsg) {
                    // React to the user's reply (the "1" or "2" message)
                    await conn.sendMessage(from, {
                        react: { text: "", key: mek.key },
                    });

                    if (messageType === "1" || messageType === "2") {
                        const down = await fg.ytv(url);
                        const downloadUrl = down.dl_url;

                        // React to the upload (sending the file)
                        await conn.sendMessage(from, {
                            react: { text: "", key: mek.key },
                        });

                        if (messageType === "1") {
                            // Handle option 1 (Audio File)
                            await conn.sendMessage(
                                from,
                                {
                                    video: { url: downloadUrl },
                                    mimetype: "video/mp4",
                                    caption: `𝖸 𝖳  𝖲 𝖣  𝖵 𝖨 𝖣 𝖤 𝖮  ( 4 8 0 𝗉  )
 
> ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ `,
                                },
                                { quoted: mek },
                            );
                        } else if (messageType === "2") {
                            // Handle option 2 (Document File)
                            await conn.sendMessage(
                                from,
                                {
                                    document: { url: downloadUrl },
                                    mimetype: "video/mp4",
                                    fileName: `ʜʏᴘᴇʀ-ᴍᴅ V1.0.0 | ${data.title}.mp4`,
                                    caption: `> ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ 
`,
                                },
                                { quoted: mek },
                            );
                        }

                        // React to the successful completion of the task
                        await conn.sendMessage(from, {
                            react: { text: "", key: mek.key },
                        });

                        console.log("Response sent successfully");
                    } else {
                        // Handle invalid input (not 1 or 2)
                        await conn.sendMessage(from, {
                            react: { text: "❓", key: mek.key },
                        });
                        reply("𝖯𝗅𝖾𝖺𝗌𝖾 𝖤𝗇𝗍𝖾𝗋 `𝖵𝖺𝗅𝗂𝖽 𝖮𝗉𝗍𝗂𝗈𝗇 1 𝖮𝗋 2` ❗");
                    }
                }
            });
        } catch (e) {
            console.log(e);
            reply("𝖯𝗅𝖾𝖺𝗌𝖾 𝖦𝗂𝗏𝖾 𝖬𝖾 𝖯𝗋𝗈𝗏𝗂𝖽𝖾 `𝖵𝗂𝖽𝖾𝗈 𝖳𝖺𝗍𝗂𝗅𝖾 𝖮𝗋 𝖴𝗋𝗅` ❗");
        }
    },
);


//==============   FACEBOOK DL   ==============//

const baseUrl = "https://www.dark-yasiya-api.site/";

async function socialMediaDownload(url) {
    let endpoint;
    if (url.includes("facebook.com") || url.includes("fb.watch")) {
        endpoint = `${baseUrl}/api/fbdl2?url=${q}`;
        } else if (url.includes("mediafire.com")) {
            endpoint = `${baseUrl}/api/mediafiredl?url=${encodeURIComponent(url)}`;
        } else if (url.includes("twitter.com")) {
            endpoint = `${baseUrl}/api/twitter/dl?url=${encodeURIComponent(url)}`;
        } else {
        throw new Error("𝖯𝗅𝖾𝖺𝗌𝖾 𝖦𝗂𝗏𝖾 𝖬𝖾 𝖯𝗋𝗈𝗏𝗂𝖽𝖾 `𝖥𝖺𝖼𝖾𝖻𝗈𝗈𝗄 𝖴𝗋𝗅` ❗");
    }
    const response = await axios.get(endpoint);
    return response.data;
}

cmd(
    {
        pattern: "fb",
        alias: ["facebook"],
        react: "🔎",
        desc: "Download Facebook videos",
        category: "download",
        use: ".fb <facebook link>",
        filename: __filename,
    },
    async (
        conn,
        mek,
        m,
        { from, quoted, args, q, isGroup, sender, pushname, reply },
    ) => {
        try {
            
            if (!q)
                return await reply("𝖯𝗅𝖾𝖺𝗌𝖾 𝖦𝗂𝗏𝖾 𝖬𝖾 𝖯𝗋𝗈𝗏𝗂𝖽𝖾 `𝖥𝖺𝖼𝖾𝖻𝗈𝗈𝗄 𝖴𝗋𝗅` ❗");


            const response = await socialMediaDownload(q);

            if (response.status === "success ✅" && response.data) {
                const { hd, sd, audio } = response.data;

                if (hd || sd) {

                    // Prompt user to select HD or SD
                    const videoMessage = `乂 HYPER-MD FB DOWNLOADER

🎬 𝖳𝖺𝗍𝗂𝗅𝖾 : Undifended
🖇️ 𝖡𝖺𝗌𝖾 𝖴𝗋𝗅 : www.facebook.com


乂 REPLY THE DOWNLOAD OPTION

1 ||  𝖣𝗈𝗐𝗇𝗅𝗈𝖺𝖽 : 𝖵𝗂𝖽𝖾𝗈 𝖧𝖣 𝖳𝗒𝗉𝖾.
2 ||  𝖣𝗈𝗐𝗇𝗅𝗈𝖺𝖽 : 𝖵𝗂𝖽𝖾𝗈 𝖲𝖣 𝖳𝗒𝗉𝖾.

> ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ `;



                    const sentMessage = await conn.sendMessage(
                        from,
                        {
                            text: videoMessage,
                            contextInfo: {
                                forwardingScore: 999,
                                isForwarded: true,
                                forwardedNewsletterMessageInfo: {
                                    newsletterName: "HYPER-MD",
                                    newsletterJid: "120363325937635174@newsletter",
                                },
                                    externalAdReply: {
                                          title: `HYPER-MD FB Downloader`,
                                          body: `Undifended : ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ  FB Information Search Engine`,
                                          thumbnailUrl: `https://telegra.ph/file/3c64b5608dd82d33dabe8.jpg`,
                                          sourceUrl:  ``,
                                          mediaType: 1,
                                          renderLargerThumbnail: true
                                },
                            },
                        },
                        { quoted: mek },
                    );

                    conn.ev.on("messages.upsert", async (messageUpsert) => {
                        const msg = messageUpsert.messages[0];
                        if (!msg.message || !msg.message.extendedTextMessage)
                            return;

                        const userReply =
                            msg.message.extendedTextMessage.text.trim();
                        const messageContext =
                            msg.message.extendedTextMessage.contextInfo;

                        if (
                            messageContext &&
                            messageContext.stanzaId === sentMessage.key.id
                        ) {
                            // Send the selected video quality
                            if (userReply === "1" && hd) {
                                await conn.sendMessage( 
                                    from,
                                    {

                                        video: { url: hd },
                                        caption: `𝖥 𝖡  𝖧 𝖣  𝖵 𝖨 𝖣 𝖤 𝖮  ( 7 2 0 𝗉 )

> ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ `,

                                    },
                                    { quoted: mek },
                                );
                            } else if (userReply === "2" && sd) {
                                await conn.sendMessage(
                                    from,
                                    {
                                        video: { url: sd },
                                        caption: `𝖥 𝖡  𝖲 𝖣  𝖵 𝖨 𝖣 𝖤 𝖮  ( 4 8 0 𝗉 )

> ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ `,
                                    },
                                    { quoted: mek },





                                );
                            } else {
                                reply(
                                    "𝖯𝗅𝖾𝖺𝗌𝖾 𝖤𝗇𝗍𝖾𝗋 𝖵𝖺𝗅𝗂𝖽 𝖮𝗉𝗍𝗂𝗈𝗇 `1 𝖮𝗋 2` ❗",
                                );
                            }
                        }
                    });
                } else {
                    reply("No Video URL Found in the Response.");


                }
            } else {
                reply("Failed to Fetch Video Data.");
                }



        } catch (e) {
            console.error("Detailed Error:", e);
            reply(
                "𝖯𝗅𝖾𝖺𝗌𝖾 𝖦𝗂𝗏𝖾 𝖬𝖾 𝖯𝗋𝗈𝗏𝗂𝖽𝖾 `𝖥𝖺𝖼𝖾𝖻𝗈𝗈𝗄 𝖴𝗋𝗅` ❗",
            );
        }
    },
);


//==============   TIK TOK DL   ==============//

cmd({
    pattern: "tt",
    alias: ["tiktok"],
    react: '🎵',
    desc: "Download TikTok videos",
    category: "download",
    use: '.tt <tiktok link>',
    filename: __filename
}, async (conn, mek, m, { from, args, reply, pushname }) => {
    try {

        // Get the TikTok URL from args
        const q = args.join(" ");
        if (!q) return await reply("𝖯𝗅𝖾𝖺𝗌𝖾 𝖦𝗂𝗏𝖾 𝖬𝖾 𝖯𝗋𝗈𝗏𝗂𝖽𝖾 `𝖳𝗂𝗄𝗍𝗈𝗄 𝖴𝗋𝗅` ❗");

        // Watermark message
        let wm = `乂 HYPER-MD TIK TOK DOWNLOADER

🎬 𝖳𝖺𝗍𝗂𝗅𝖾 : Undifended
🖇️ 𝖡𝖺𝗌𝖾 𝖴𝗋𝗅 : www.tiktok.com


乂 REPLY THE DOWNLOAD OPTION

1 ||  𝖣𝗈𝗐𝗇𝗅𝗈𝖺𝖽 : 𝖵𝗂𝖽𝖾𝗈 𝖧𝖣 𝖳𝗒𝗉𝖾. ( 𝖶𝗂𝗍𝗁𝗈𝗎𝗍 𝖶𝖺𝗍𝖾𝗋𝗆𝖺𝗋𝗄 )
2 ||  𝖣𝗈𝗐𝗇𝗅𝗈𝖺𝖽 : 𝖠𝗎𝖽𝗂𝗈 𝖳𝗒𝗉𝖾.

> ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ `;

        const sentMessage = await conn.sendMessage(
            from,
            {
                text: wm,
                contextInfo: {
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterName: "HYPER-MD",
                        newsletterJid: "120363325937635174@newsletter",
                    },
                        externalAdReply: {
                              title: `HYPER-MD Tik Tok Downloader`,
                              body: `Undifended : ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ  Tiktok Information Search Engine`,
                              thumbnailUrl: `https://telegra.ph/file/3c64b5608dd82d33dabe8.jpg`,
                              sourceUrl:  ``,
                              mediaType: 1,
                              renderLargerThumbnail: true
                    },
                    },
                        },
                        { quoted: mek },
                    );




        // Perform TikTok download using a hypothetical tiktokdl function
        let response = await tiktokdl(q);
        let { video, music } = response;

        // Send initial message with options



        // Listen for user's reply
        conn.ev.on("messages.upsert", async (messageUpsert) => {
            const msg = messageUpsert.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const userReply = msg.message.extendedTextMessage.text.trim();
            const messageContext = msg.message.extendedTextMessage.contextInfo;

            // Check if the reply is to the previously sent prompt
            if (messageContext && messageContext.stanzaId === sentMessage.key.id) {
                if (userReply === '1') {
                    // Send the video
                    await conn.sendMessage(from, { 
                        video: { url: video }, 
                        caption: `𝖳 𝖨 𝖪 𝖳 𝖮 𝖪  𝖧 𝖣  𝖵 𝖨 𝖣 𝖤 𝖮  ( 7 2 0 𝗉  )

> ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ `

                    }, { quoted: msg });
                } else if (userReply === '2') {
                    // Send the audio
                    await conn.sendMessage(from, { 
                        audio: { url: music }, 
                        mimetype: "audio/mpeg" 
                    }, { quoted: msg });
                } else {
                    await conn.sendMessage(from, { 
                        text: "𝖯𝗅𝖾𝖺𝗌𝖾 𝖤𝗇𝗍𝖾𝗋 𝖵𝖺𝗅𝗂𝖽 𝖮𝗉𝗍𝗂𝗈𝗇 `1 𝖮𝗋 2` ❗" 
                    }, { quoted: msg });
                }
            }
        });

        // Send a reaction

                    } catch (e) {
console.error("Error", e);
                    reply(
                        "𝖯𝗅𝖾𝖺𝗌𝖾 𝖦𝗂𝗏𝖾 𝖬𝖾 𝖯𝗋𝗈𝗏𝗂𝖽𝖾 `𝖳𝗂𝗄𝗍𝗈𝗄 𝖴𝗋𝗅` ❗",

);
        }
    },
);





//==============   GDRIVE DL   ==============//

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Google Drive Downloader with size limit (e.g., 100MB limit)
const MAX_DOWNLOAD_SIZE = 500 * 1024 * 1024; // 100 MB

cmd({
    pattern: "gdrive",
    alias: ["googledrive"],
    react: '🎗️',
    desc: "Download Google Drive files",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, q, pushname }) => {
    if (!q || !q.startsWith("https://")) {
        return conn.sendMessage(from, { text: "𝖯𝗅𝖾𝖺𝗌𝖾 𝖦𝗂𝗏𝖾 𝖬𝖾 𝖯𝗋𝗈𝗏𝗂𝖽𝖾 `𝖦𝖽𝗋𝗂𝗏𝖾 𝖴𝗋𝗅` ❗" }, { quoted: mek });
    }

    const data = await fetchJson(`${baseUrl}/api/gdrivedl?url=${encodeURIComponent(q)}`);
    const fileInfo = data.data || data;
                                                  // Send the song info with context
                                                  const downloadingMsg = await conn.sendMessage(
                                                      from,
                                                      {
                                                          text: `乂 HYPER-MD GDRIVE DOWNLOADER
                                                          
📁 𝖭𝖺𝗆𝖾 : ${fileInfo.fileName}
📻 𝖥𝗂𝗅𝖾 𝖲𝗂𝗓𝖾 : ${fileInfo.fileSize}
🖇️ 𝖡𝖺𝗌𝖾 𝖴𝗋𝗅 : www.gdrive.com

> ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ `,
                                                          contextInfo: {
                                                              forwardingScore: 999,
                                                              isForwarded: true,
                                                              forwardedNewsletterMessageInfo: {
                                                                  newsletterName: "HYPER-MD",
                                                                  newsletterJid: "120363325937635174@newsletter",
                                                              },
                                                              externalAdReply: {
                                                                  title: `HYPER-MD Gdrive Downloader`,
                                                                  body: `${fileInfo.fileName || fileInfo.title || `Undifended`} : ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ Gdrive Information Search Engine`,
                                                                  thumbnailUrl: `https://telegra.ph/file/3c64b5608dd82d33dabe8.jpg`,
                                                                  sourceUrl: ``,
                                                                  mediaType: 1,
                                                                  renderLargerThumbnail: true, 
        


          },
          },
              },
              { quoted: mek },
          );
 
        
        

    try {
       
        const data = await fetchJson(`${baseUrl}/api/gdrivedl?url=${encodeURIComponent(q)}`);
        const fileInfo = data.data || data;

        // Check if file size is available and handle accordingly
        const fileSize = fileInfo.fileSize || 0; // Default to 0 if fileSize is not present
        const MAX_DOWNLOAD_SIZE = 500 * 1024 * 1024; // 500 MB

        if (fileSize > MAX_DOWNLOAD_SIZE) {
            await conn.sendMessage(from, { text: `⚠️ The file size is too large. Maximum allowed size is 500 MB. The provided file is ${formatFileSize(fileSize)}.` }, { quoted: mek });
            return await conn.sendMessage(from, { react: { text: "⚠️", key: mek.key } });
        }

        const caption = `> ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ `;
        await conn.sendMessage(from, { 
            document: { url: fileInfo.download || fileInfo.link || fileInfo.url }, 
            fileName: fileInfo.fileName || fileInfo.title, 
            mimetype: fileInfo.mimeType || fileInfo.file_type,
            caption: caption
        }, { quoted: mek });

    



        await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });
                                    
    } catch (error) {
        console.error('❌ Error in Google Drive downloader:', error);
        const errorMessage = error.response && error.response.status === 404 
            ? '❌ Error: The requested file could not be found. Please check the URL and try again.'
            : `❌ An error occurred: ${error.message}`;


await conn.sendMessage(from, { text: errorMessage }, { quoted: mek });
        await conn.sendMessage(from, { react: { text: "❌", key: mek.key } });

 }
});


cmd({
    pattern: "apkdl",
    desc: "Fetch APK details and send APK file.",
    category: "download",
    react: "🔎",
    filename: __filename
},
async (conn, mek, m, { from, reply, q, pushname }) => {
    try {

        if (!q) {
            return reply("𝖯𝗅𝖾𝖺𝗌𝖾 𝖦𝗂𝗏𝖾 𝖬𝖾 𝖯𝗋𝗈𝗏𝗂𝖽𝖾 `𝖠𝗉𝗉𝗅𝗂𝖼𝖺𝗍𝗂𝗈𝗇 𝖭𝖺𝗆𝖾` ❗");
        }

        const apkurl = `https://prabath-md-api.up.railway.app/api/apkdl?q=${q}&apikey=${sai}`;
        const response = await axios.get(apkurl);
        const data = response.data;

        if (!data || !data.data) {
            return reply("𝖯𝗅𝖾𝖺𝗌𝖾 𝖦𝗂𝗏𝖾 𝖬𝖾 𝖯𝗋𝗈𝗏𝗂𝖽𝖾 `𝖠𝗉𝗉𝗅𝗂𝖼𝖺𝗍𝗂𝗈𝗇 𝖭𝖺𝗆𝖾` ❗");
        }

        const apkData = data.data;
        const apkIcon = apkData.icon;
        const apkName = apkData.name;
        const apkPackage = apkData.package;
        const apkLastUpdate = apkData.lastup;
        const apkSize = apkData.size;
        const apkDownloadLink = apkData.dllink;

        await conn.sendMessage(from, {
            image: { url: apkIcon },





                text: `乂 HYPER-MD APK DOWNLOADER

📁 𝖭𝖺𝗆𝖾 : ${apkName}
📻 𝖥𝗂𝗅𝖾 𝖲𝗂𝗓𝖾 : ${apkSize} MB
📆 𝖫𝖺𝗌𝗍 𝖴𝗉𝖽𝖺𝗍𝖾 : ${apkLastUpdate}
🖇️ 𝖡𝖺𝗌𝖾 𝖴𝗋𝗅 : www.playstore.com

> ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ `,
                contextInfo: {
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterName: "HYPER-MD",
                        newsletterJid: "120363325937635174@newsletter",
                    },
                    externalAdReply: {
                        title: `HYPER-MD Application Downloader`,
                        body: `${apkName} : ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ Apk Information Search Engine`,
                        thumbnailUrl: apkData.icon,
                        sourceUrl: ``,
                        mediaType: 1,
                        renderLargerThumbnail: true,

        },
                },
            },
            { quoted: mek },
        );

        const filePath = path.join(__dirname, `${apkPackage}.apk`);

        const apkResponse = await axios({
            url: apkDownloadLink,
            method: 'GET',
            responseType: 'stream'
        });

        const writer = fs.createWriteStream(filePath);

        apkResponse.data.pipe(writer);

        writer.on('error', (err) => {
            console.error(`File write error: ${err.message}`);
            reply(`Error: ${err.message}`);
        });

        await new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });

        await conn.sendMessage(from, {
            document: { url: filePath },
            mimetype: 'application/vnd.android.package-archive',
            fileName: `${apkName}.apk`,
            caption: `ʜʏᴘᴇʀ • ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ-ᴡᴀ-ʙᴏᴛ ㋛`,
            footer: 'ʜʏᴘᴇʀ • ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ-ᴡᴀ-ʙᴏᴛ ㋛'
        }, { quoted: mek });

        fs.unlinkSync(filePath);

    } catch (e) {
        console.error(e);
        reply(`Error: ${e.message}`);
    }
});


//twitter dl (x)
cmd({
    pattern: "twitter",
    alias: ["twdl"],
    desc: "download tw videos",
    category: "download",
    react: "🔎",
    filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q && !q.startsWith("https://")) return reply("𝖯𝗅𝖾𝖺𝗌𝖾 𝖦𝗂𝗏𝖾 𝖬𝖾 𝖳𝗐𝗂𝗍𝗍𝖾𝗋 𝖴𝗋𝗅")
        //fetch data from api  
        let data = await fetchJson(`${baseUrl}/api/twitterdl?url=${q}`)
        reply("𝖣𝗈𝗐𝗇𝗅𝗈𝖺𝖽𝗂𝗇𝗀...")
        //send video (hd,sd)
        await conn.sendMessage(from, { video: { url: data.data.data.HD }, mimetype: "video/mp4", caption: `- HD \n\n > ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ ` }, { quoted: mek })
        await conn.sendMessage(from, { video: { url: data.data.data.SD }, mimetype: "video/mp4", caption: `- SD \n\n > ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ ` }, { quoted: mek })  
        //send audio    
        await conn.sendMessage(from, { audio: { url: data.data.data.audio }, mimetype: "audio/mpeg" }, { quoted: mek })  
    } catch (e) {
        console.log(e)
        reply(`${e}`)
    }
})


