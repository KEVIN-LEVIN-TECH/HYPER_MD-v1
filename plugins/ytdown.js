const { cmd } = require('../command');
const yts = require('yt-search');
const axios = require('axios');

// Helper function to extract YouTube ID
function extractYouTubeId(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

// Helper function to convert to a proper YouTube URL
function convertYouTubeLink(url) {
    const id = extractYouTubeId(url);
    return id ? `https://www.youtube.com/watch?v=${id}` : url;
}

// YouTube MP3 Downloader Command
cmd({
    pattern: "ytmp3",
    alias: ["mp3"],
    desc: "Download audio from YouTube",
    react: "🎵",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, quoted, q, reply }) => {
    try {
        if (!q) return reply("❌ Please provide a YouTube URL or title.");

        const query = convertYouTubeLink(q);
        const searchResults = await yts(query);
        const video = searchResults.videos[0];

        if (!video) return reply("❌ No video found for the given query.");

        const downloadUrl = `https://api.giftedtech.my.id/api/download/ytmp3?apikey=gifted&url=${video.url}`;
        reply(`🎵 Downloading MP3 for: ${video.title}`);

        const response = await axios.get(downloadUrl);
        const audioUrl = response.data.result.download_url;

        const contextInfo = {
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterName: "Ytmp3 Download By HYPER-MD",
                newsletterJid: "120363325937635174@newsletter",
            },
            externalAdReply: {
                title: "HYPER-MD YTMP3 DOWNLOAD",
                body: "©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ ",
                thumbnailUrl: "https://telegra.ph/file/3c64b5608dd82d33dabe8.jpg",
                mediaType: 1,
                renderLargerThumbnail: true,
            },
        };


        reply("✅ Successfully sent the MP3 file.");
    } catch (err) {
        console.error(err);
        reply("❌ Failed to download the audio. Please try again.");
    }
});

// YouTube MP4 Downloader Command
cmd({
    pattern: "ytmp4",
    alias: ["mp4", "video"],
    desc: "Download video from YouTube",
    react: "🎥",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, quoted, q, reply }) => {
    try {
        if (!q) return reply("❌ Please provide a YouTube URL or title.");

        const query = convertYouTubeLink(q);
        const searchResults = await yts(query);

        if (!searchResults || !searchResults.videos || searchResults.videos.length === 0) {
            return reply("❌ No video found for the given query.");
        }

        const video = searchResults.videos[0];
        const downloadUrl = `https://api.giftedtech.my.id/api/download/ytmp4?apikey=gifted&url=${video.url}`;

        if (!downloadUrl) {
            return reply("❌ Could not generate the download URL.");
        }

        reply(`🎥 Downloading MP4 for: ${video.title}`);

        try {
            const response = await axios.get(downloadUrl);
            const videoUrl = response?.data?.result?.download_url;

            if (!videoUrl) {
                throw new Error("Invalid API response.");
            }

            await conn.sendMessage(from, {
                video: { url: videoUrl },
                mimetype: "video/mp4",
                caption: `🎥 ${video.title}\n\nDownloaded successfully.\n\n©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ `
            }, { quoted: mek });

            reply("✅ Successfully sent the video file.");
        } catch (apiError) {
            console.error(apiError);
            reply("❌ Failed to fetch the video download link.");
        }
    } catch (err) {
        console.error(err);
        reply("❌ An unexpected error occurred. Please try again.");
    }
});
