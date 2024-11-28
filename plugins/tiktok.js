const { fetchJson } = require('../lib/functions');
const { cmd } = require('../command');

// Base API URL
let baseUrl = 'https://www.dark-yasiya-api.site/download/tiktok?url=https://vt.tiktok.com/ZSje1Vkup'; 

cmd({
    pattern: "tiktok",
    alias: ["tt"],
    desc: "Download TikTok videos",
    category: "download",
    react: "🔎",
    filename: __filename
},
async (conn, mek, m, { from, quoted, args, q, reply }) => {
    try {
        // Validate URL
        if (!q || !q.startsWith("https://")) {
            return reply("Please provide a valid TikTok video URL!");
        }

        // Fetch TikTok video details
        const apiEndpoint = `${baseUrl}/download/tiktok?url=${q}`;
        const data = await fetchJson(apiEndpoint);

        // Validate API response
        if (!data || !data.data) {
            return reply("Failed to fetch video details. Please check the URL or try again later.");
        }

        // Video Options Description
        const desc = `
🎬 TikTok Video Downloader 🎬

Reply with an option:

1️ || Download Video with Watermark  
2️ || Download Video without Watermark  
3️ || Download Audio Only  

©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ 
        `;

        // Send thumbnail with description
        const messageOptions = await conn.sendMessage(from, {
            image: { url: data.data.thumb },
            caption: desc,
        }, { quoted: mek });

        // Listen for user response
        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            // Verify reply context
            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === messageOptions.key.id) {
                switch (selectedOption) {
                    case '1': // Video with Watermark
                        await conn.sendMessage(from, {
                            video: { url: data.data.wm },
                            mimetype: "video/mp4",
                            caption: "✅ Video with Watermark\n©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ ",
                        }, { quoted: mek });
                        break;
                    case '2': // Video without Watermark
                        await conn.sendMessage(from, {
                            video: { url: data.data.no_wm },
                            mimetype: "video/mp4",
                            caption: "✅ Video without Watermark\n©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ ",
                        }, { quoted: mek });
                        break;
                    case '3': // Audio Only
                        await conn.sendMessage(from, {
                            audio: { url: data.data.audio },
                            mimetype: "audio/mpeg",
                            caption: "✅ TikTok Audio\n©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ ",
                        }, { quoted: mek });
                        break;
                    default:
                        reply("Invalid option selected. Please try again!");
                }
            }
        });
    } catch (error) {
        console.error(error);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        reply("An error occurred while processing your request. Please try again later.");
    }
});
