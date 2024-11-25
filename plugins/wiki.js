const { cmd } = require('../command');

// ========== WIKI COMMAND ==========
cmd({
    pattern: "wiki",
    react: "📚",
    desc: "Search for Wikipedia articles",
    category: "main",
    filename: __filename,
},
async (conn, mek, m, { from, reply, pushname, args }) => {
    try {
        if (!args || args.length === 0) {
            return reply("❌ Please provide a search keyword.\n\nUsage: *wiki [query]*");
        }

        const searchQuery = args.join(" ");
        reply("📚 Searching Wikipedia for: " + searchQuery + "...");

        const axios = require('axios');
        const apiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(searchQuery)}`;

        const response = await axios.get(apiUrl);

        if (response.status !== 200 || !response.data) {
            return reply("❌ Could not find any results for: " + searchQuery);
        }

        const { title, extract, content_urls, thumbnail } = response.data;

        let wikiResult = `📚 Wikipedia Search Results\n\n`;
        wikiResult += `Title: ${title}\n`;
        wikiResult += `Summary: ${extract || "No summary available"}\n`;
        if (content_urls && content_urls.desktop) {
            wikiResult += `🌐 Read More: [Click Here](${content_urls.desktop.page})\n`;
        }

        // If there's a thumbnail, include it
        if (thumbnail && thumbnail.source) {
            await conn.sendMessage(
                from,
                {
                    image: { url: thumbnail.source },
                    caption: wikiResult,
                },
                { quoted: mek }
            );
        } else {
            await conn.sendMessage(from, { text: wikiResult }, { quoted: mek });
        }
    } catch (error) {
        console.error(error);
        reply("❌ An error occurred while fetching the Wikipedia article.");
    }
});
