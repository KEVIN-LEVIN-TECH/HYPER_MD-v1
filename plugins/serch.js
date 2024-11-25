const { readEnv } = require('../lib/database');
const { cmd } = require('../command');

// ========== SEARCH COMMAND ==========
cmd({
    pattern: "search",
    react: "🔍",
    desc: "Search for information using keywords",
    category: "main",
    filename: __filename,
},
async (conn, mek, m, { from, reply, pushname, args }) => {
    try {
        if (!args || args.length === 0) {
            return reply("❌ Please provide a search keyword.\n\nUsage: *search [query]*");
        }

        const searchQuery = args.join(" ");
        reply("🔎 Searching for: " + searchQuery + "...");

        // Use a public search API or your own custom API
        const axios = require('axios');
        const searchUrl = `https://api.duckduckgo.com/?q=${encodeURIComponent(searchQuery)}&format=json`;

        const response = await axios.get(searchUrl);
        const results = response.data.RelatedTopics;

        if (!results || results.length === 0) {
            return reply("❌ No results found for: " + searchQuery);
        }

        // Prepare response with search results
        let searchResults = `🔍 Search Results for: *${searchQuery}*\n\n`;
        results.slice(0, 5).forEach((item, index) => {
            if (item.Text && item.FirstURL) {
                searchResults += `${index + 1}. *${item.Text}*\n   🌐 [Link](${item.FirstURL})\n\n`;
            }
        });

        await conn.sendMessage(from, { text: searchResults.trim() }, { quoted: mek });
    } catch (error) {
        console.error(error);
        reply("❌ An error occurred while searching.");
    }
});
