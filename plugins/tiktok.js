const { WAConnection, MessageType, Mimetype } = require('@adiwajshing/baileys');
const TikTokScraper = require('tiktok-scraper');
const fs = require('fs');

async function searchTikTok(query) {
    try {
        const posts = await TikTokScraper.trend('', { number: 5 });
        return posts.collector.map(video => ({
            id: video.id,
            title: video.text,
            url: video.webVideoUrl,
            author: video.authorMeta.name
        }));
    } catch (error) {
        console.error('TikTok search error:', error);
        return [];
    }
}

async function downloadTikTokVideo(url, path) {
    try {
        const videoBuffer = await TikTokScraper.getVideoMeta(url, { noWaterMark: true });
        fs.writeFileSync(path, videoBuffer);
        return path;
    } catch (error) {
        throw new Error('Failed to download video');
    }
}

async function startBot() {
    const conn = new WAConnection();
    let searchResults = [];

    conn.on('open', () => {
        console.log('WhatsApp bot connected');
    });

    conn.on('chat-update', async chatUpdate => {
        if (!chatUpdate.hasNewMessage) return;
        const message = chatUpdate.messages.all()[0];
        if (!message.message || message.key.fromMe) return;

        const messageType = Object.keys(message.message)[0];
        const textMessage = message.message.conversation || message.message[messageType].text;

        // Step 1: Search TikTok
        if (textMessage.startsWith('!tt ')) {
            const query = textMessage.slice(4); // Remove "!tt " command prefix
            searchResults = await searchTikTok(query);

            if (searchResults.length === 0) {
                await conn.sendMessage(message.key.remoteJid, 'No results found.', MessageType.text);
                return;
            }

            let response = 'TikTok Search Results:\n\n';
            searchResults.forEach((video, index) => {
                response += `${index + 1}. *${video.title}*\n`;
                response += `   Author: ${video.author}\n`;
                response += `   🔗 ${video.url}\n\n`;
            });

            response += 'Reply with the number of the video you want to download.';
            await conn.sendMessage(message.key.remoteJid, response, MessageType.text);
        }

        // Step 2: Download Selected TikTok Video
        else if (/^\d+$/.test(textMessage)) {
            const choice = parseInt(textMessage) - 1;

            if (searchResults[choice]) {
                const video = searchResults[choice];
                const videoPath = './downloaded_tiktok.mp4';

                await conn.sendMessage(message.key.remoteJid, 'Downloading video, please wait...', MessageType.text);

                try {
                    await downloadTikTokVideo(video.url, videoPath);

                    await conn.sendMessage(
                        message.key.remoteJid,
                        fs.readFileSync(videoPath),
                        MessageType.video,
                        { mimetype: Mimetype.mp4, caption: `Here is your TikTok video: ${video.title}` }
                    );

                    fs.unlinkSync(videoPath); // Delete the video file after sending
                } catch (error) {
                    console.error('Video download error:', error);
                    await conn.sendMessage(message.key.remoteJid, 'Failed to download the video.', MessageType.text);
                }
            } else {
                await conn.sendMessage(message.key.remoteJid, 'Invalid choice. Please enter a valid number.', MessageType.text);
            }
        }
    });

    await conn.connect();
}

startBot();
