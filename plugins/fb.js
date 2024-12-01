const { fetchJson, isUrl } = require('../lib/functions'); // Import necessary functions
const { cmd } = require('../command'); // Import cmd function

let baseUrl = 'https://api.dark-yasiya.site'; // API base URL

cmd({
    pattern: "fb",
    desc: "Download Facebook videos",
    category: "download",
    react: "🔎",
    filename: __filename
},
async (conn, mek, m, { from, quoted, args, q, reply }) => {
    try {
        if (!q || !isUrl(q) || !q.includes("facebook.com")) {
            return reply("❌ Please provide a valid Facebook video URL!");
        }

        const apiEndpoint = `${baseUrl}/download/fbdl1?url=${q}`;
        const data = await fetchJson(apiEndpoint);

        if (!data || !data.data) {
            return reply("❌ Failed to fetch video details. Please try again later!");
        }

        const contextInfo = {
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterName: "HYPER-MD",
                newsletterJid: "0029VamA19KFCCoY1q9cvn2I@g.us", // Updated to your channel JID
            },
            externalAdReply: {
                title: "HYPER-MD Fb Downloader",
                body: "Info: Powered by HYPER-MD",
                thumbnailUrl: data.data.thumbnail || "https://telegra.ph/file/3c64b5608dd82d33dabe8.jpg", // Thumbnail from API or default
                mediaType: 1,
                renderLargerThumbnail: true,
            },
        };

        const optionsMessage = `
📥 Facebook Video Downloader 📥

🔢 Reply Below Number

1 || Download Video in HD  
2 || Download Video in SD  

© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ 
        `;

        const optionsMsg = await conn.sendMessage(
            from,
            {
                text: optionsMessage,
                contextInfo: contextInfo, // Include dynamic contextInfo here
            },
            { quoted: mek }
        );

        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();
            const contextReply = msg.message.extendedTextMessage.contextInfo;

            if (contextReply && contextReply.stanzaId === optionsMsg.key.id) {
                switch (selectedOption) {
                    case '1': // Download HD Video
                        if (data.data.hd) {
                            await conn.sendMessage(
                                from,
                                { video: { url: data.data.hd }, mimetype: "video/mp4", caption: "✅ HD Video downloaded successfully!\n\n© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ" },
                                { quoted: mek }
                            );
                        } else {
                            reply("❌ HD video not available for this link.");
                        }
                        break;

                    case '2': // Download SD Video
                        if (data.data.sd) {
                            await conn.sendMessage(
                                from,
                                { video: { url: data.data.sd }, mimetype: "video/mp4", caption: "✅ SD Video downloaded successfully!\n\n© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ" },
                                { quoted: mek }
                            );
                        } else {
                            reply("❌ SD video not available for this link.");
                        }
                        break;

                    default:
                        reply("❌ Invalid option selected. Please choose 1 or 2.");
                        break;
                }
            }
        });
    } catch (e) {
        console.error("Error in FB plugin:", e);
        reply("❌ An error occurred while processing your request. Please try again later!");
    }
});
