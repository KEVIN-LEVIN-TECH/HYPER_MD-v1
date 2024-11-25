const { cmd } = require('../command');
const axios = require('axios');

// ========== YTSEARCH COMMAND ==========
cmd({
    pattern: "ytsearch",
    react: "🔎",
    desc: "Search for YouTube videos",
    category: "media",
    filename: __filename,
},
async (conn, mek, m, { from, reply, args }) => {
    try {
        if (!args || args.length === 0) {
            return reply("❌ Please provide a search query.\n\nUsage: *ytsearch [query]*");
        }

        const searchQuery = args.join(" ");
        reply("🔎 Searching YouTube for: " + searchQuery + "...");

        // YouTube API Key (Replace this with your actual API key)
        const apiKey = "YOUR_YOUTUBE_API_KEY"; // Add your YouTube API Key here
        const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=5&q=${encodeURIComponent(searchQuery)}&key=${apiKey}`;

        const response = await axios.get(apiUrl);

        if (response.status !== 200 || !response.data.items) {
            return reply("❌ No results found for: " + searchQuery);
        }

        const results = response.data.items;
        let resultText = `🔎 YouTube Search Results for: ${searchQuery}\n\n`;

        results.forEach((item, index) => {
            const { title } = item.snippet;
            const videoId = item.id.videoId;
            const url = `https://www.youtube.com/watch?v=${videoId}`;
            resultText += `${index + 1}. ${title}\n   🌐 [Watch Here](${url})\n\n`;
        });

        // Send results
        await conn.sendMessage(from, { text: resultText.trim() }, { quoted: mek });
    } catch (error) {
        console.error(error);
        reply("❌ An error occurred while searching YouTube.");
    }
});
