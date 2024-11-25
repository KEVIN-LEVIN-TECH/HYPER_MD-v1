const { cmd } = require('../command');
const axios = require('axios');
const ytdl = require('ytdl-core'); // Install this using `npm install ytdl-core`
const fs = require('fs');
const path = require('path');

// ========== TOMp3 COMMAND ==========
cmd({
    pattern: "tomp3",
    react: "🎵",
    desc: "Convert YouTube videos to MP3 with interactive menu",
    category: "media",
    filename: __filename,
},
async (conn, mek, m, { from, reply, args, pushname }) => {
    try {
        if (!args || args.length === 0) {
            return reply("❌ Please provide a YouTube link.\n\nUsage: tomp3 [YouTube URL]");
        }

        const videoUrl = args[0];
        if (!ytdl.validateURL(videoUrl)) {
            return reply("❌ Invalid YouTube URL. Please provide a valid link.");
        }

        // Send interactive menu
        const menuMessage = `
╭──────────────────◆•
│ YouTube to MP3 Converter
╰──────────────────◆•
🔢 Reply Below Number


1 || Send as Audio
2 || Send as Document

© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ
        `;

        const sentMsg = await conn.sendMessage(
            from,
            {
                text: menuMessage,
            },
            { quoted: mek }
        );

        // Listen for user reply
        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const userMsg = msgUpdate.messages[0];
            if (!userMsg.message || !userMsg.message.extendedTextMessage) return;

            const selectedOption = userMsg.message.extendedTextMessage.text.trim();

            if (
                userMsg.message.extendedTextMessage.contextInfo &&
                userMsg.message.extendedTextMessage.contextInfo.stanzaId === sentMsg.key.id
            ) {
                const type = selectedOption === "1" ? "audio" : selectedOption === "2" ? "document" : null;

                if (!type) {
                    return reply("❌ Invalid option. Please reply with '1' or '2'.");
                }

                reply(`🎵 Converting YouTube video to MP3 and sending as ${type}...`);

                const videoInfo = await ytdl.getInfo(videoUrl);
                const title = videoInfo.videoDetails.title.replace(/[^a-zA-Z0-9 ]/g, "");
                const fileName = `${title}.mp3`;
                const filePath = path.join(__dirname, "../downloads", fileName);

                // Download and convert to MP3
                const stream = ytdl(videoUrl, { filter: "audioonly" }).pipe(fs.createWriteStream(filePath));

                stream.on("finish", async () => {
                    if (type === "audio") {
                        await conn.sendMessage(
                            from,
                            {
                                audio: { url: filePath },
                                mimetype: "audio/mpeg",
                                fileName,
                            },
                            { quoted: mek }
                        );
                    } else if (type === "document") {
                        await conn.sendMessage(
                            from,
                            {
                                document: { url: filePath },
                                mimetype: "audio/mpeg",
                                fileName,
                            },
                            { quoted: mek }
                        );
                    }
                    fs.unlinkSync(filePath); // Delete file after sending
                });

                stream.on("error", (error) => {
                    console.error(error);
                    reply("❌ An error occurred during the conversion.");
                });
            }
        });
    } catch (error) {
        console.error(error);
        reply("❌ An error occurred. Please try again later.");
    }
});
