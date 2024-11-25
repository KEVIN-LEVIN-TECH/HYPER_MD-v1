const { cmd } = require('../command');
const axios = require('axios');
const { Buffer } = require('buffer');

const GOOGLE_API_KEY = 'AIzaSyDebFT-uY_f82_An6bnE9WvVcgVbzwDKgU'; // Replace with your Google API key
const GOOGLE_CX = '45b94c5cef39940d1'; // Replace with your Google Custom Search Engine ID

cmd({
    pattern: "img",
    desc: "Search and send images from Google.",
    react: "🖼️",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, q, reply }) => {
    try {
        if (!q) return reply("Please provide a search query for the image.");

        // Fetch image URLs from Google Custom Search API
        const searchQuery = encodeURIComponent(q);
        const url = `https://www.googleapis.com/customsearch/v1?q=${searchQuery}&cx=${GOOGLE_CX}&key=${GOOGLE_API_KEY}&searchType=image&num=5`;

        const response = await axios.get(url);
        const data = response.data;

        if (!data.items || data.items.length === 0) {
            return reply("No images found for your query.");
        }

        const optionsDesc = `
╭──❮ Google Image Search ❯────
│
│ ➤ Search Query: ${q}
│
╰────────────────────────────

🔢 Reply Below Number

1 | Download as Normal Image
2 | Download as Document Image

©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ 
`;

        const sentMessage = await conn.sendMessage(from, { text: optionsDesc }, { quoted: mek });

        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === sentMessage.key.id) {
                for (let i = 0; i < data.items.length; i++) {
                    const imageUrl = data.items[i].link;

                    // Download the image
                    const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
                    const buffer = Buffer.from(imageResponse.data, 'binary');

                    if (selectedOption === '1') {
                        // Send image as normal type
                        await conn.sendMessage(from, {
                            image: buffer,
                            caption: `
🌟 *-------「 Hyper MD Image ${i + 1} 」-------* 🌟

©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ
                            `
                        }, { quoted: mek });
                    } else if (selectedOption === '2') {
                        // Send image as document type
                        await conn.sendMessage(from, {
                            document: buffer,
                            mimetype: 'image/jpeg',
                            fileName: `SearchResult_${i + 1}.jpg`,
                            caption: `
🌟 *-------「 Hyper MD Image ${i + 1} (Document) 」-------* 🌟

©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ
                            `
                        }, { quoted: mek });
                    } else {
                        reply("❌ Invalid option. Please select a valid option.");
                        return;
                    }
                }
            }
        });
    } catch (e) {
        console.error(e);
        reply(`Error: ${e.message}`);
    }
});
