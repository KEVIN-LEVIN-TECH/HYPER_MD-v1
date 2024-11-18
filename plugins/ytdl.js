const config = require('../config')
const {cmd , commands} = require('../command')
const { getBuffer } = require('./lib/functions');
const ytdl = require('ytdl-core');
const axios = require('axios');

cmd({
    pattern: 'ytdl',
    alias: ['yt', 'youtube'],
    desc: 'Download YouTube video or audio',
    category: 'download',
    react: '🎵'
}, async (conn, mek, m, { args, reply, from }) => {
    if (!args[0]) return reply('Provide a valid YouTube URL.');

    const url = args[0];
    if (!ytdl.validateURL(url)) return reply('Invalid YouTube URL.');

    try {
        // Get video info
        const info = await ytdl.getInfo(url);
        const title = info.videoDetails.title;

        // Choose format (audio or video)
        const format = args[1] === 'audio' ? 'audio' : 'video';
        const outputFormat = format === 'audio' ? 'mp3' : 'mp4';

        // Get video download link
        const videoLink = ytdl.chooseFormat(info.formats, { quality: 'highest' });
        const buffer = await getBuffer(videoLink.url);

        // Send video or audio
        await conn.sendMessage(from, {
            [format]: buffer,
            mimetype: format === 'audio' ? 'audio/mpeg' : 'video/mp4',
            fileName: `${title}.${outputFormat}`,
            caption: `*Downloaded:* ${title}`
        }, { quoted: mek });
    } catch (error) {
        console.error(error);
        reply('Error downloading video. Please try again.');
    }
});
