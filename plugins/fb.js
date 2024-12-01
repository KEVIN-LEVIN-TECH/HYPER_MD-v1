const { fetchJson } = require('../lib/functions');
const config = require('../config');
const { cmd } = require('../command');

// FETCH API BASE URL
let baseUrl;
(async () => {
    const baseUrlGet = await fetchJson(`https://api-pink-venom.vercel.app/api/fbdl?url=https://www.facebook.com/share/v/96sTSx436kHcRmya/?mibextid=SphRi8`);
    baseUrl = baseUrlGet.api;
})();

// Facebook Video Downloader Command
cmd({
    pattern: "fb",
    desc: "Download Facebook videos",
    category: "download",
    react: "🔎",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, reply }) => {
    try {
        if (!q || !q.startsWith("https://")) {
            return reply("❌ Please provide a valid Facebook video URL!");
        }

        // Fetch video data from the API
        const data = await fetchJson(`${baseUrl}/api/fdown?url=${q}`);

        if (!data || !data.data) {
            return reply("❌ Failed to fetch video details. Please check the URL or try again later.");
        }

        const hdVideoUrl = data.data.hd;
        const sdVideoUrl = data.data.sd;
        const thumbnailUrl = data.data.thumbnail; // Thumbnail fetched from the API

        // Construct a description with options
        const desc = `🌐 HYPER-MD FB DOWNLOADER...

🎥 Video Details
• Title: ${data.data.title || "N/A"}
• Duration: ${data.data.duration || "N/A"}

📥 Reply to this message with your option

1️ Download FB Video in *HD*
2️ Download FB Video in *SD*

> ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ`;

        // Send the thumbnail with download options
        const vv = await conn.sendMessage(
            from,
            {
                image: { url: thumbnailUrl },
                caption: desc,
            },
            { quoted: mek }
        );

        // Handle user response for download options
        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            // Ensure the reply corresponds to the initial message
            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === vv.key.id) {
                switch (selectedOption) {
                    case '1':
                        // Send HD video
                        await conn.sendMessage(
                            from,
                            { video: { url: hdVideoUrl }, mimetype: "video/mp4", caption: "> 🎥 *Downloaded in HD*\n\n©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ" },
                            { quoted: mek }
                        );
                        break;
                    case '2':
                        // Send SD video
                        await conn.sendMessage(
                            from,
                            { video: { url: sdVideoUrl }, mimetype: "video/mp4", caption: "> 🎥 *Downloaded in SD*\n\n©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ" },
                            { quoted: mek }
                        );
                        break;
                    default:
                        reply("❌ Invalid option. Please reply with '1' or '2'.");
                }
            }
        });

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        reply('❌ An error occurred while processing your request.');
    }
});
