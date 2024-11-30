const config = require('../config');
const { cmd } = require('../command');
const { fetchJson } = require('../lib/functions');

const apilink = 'https://dark-yasiya-news-apis.vercel.app/api'; // API LINK

// Function to Send News to a Group
const sendNewsToGroup = async (conn, mek, reply, newsData, groupJid) => {
    try {
        const msg = `
           ⭐ *${newsData.source.toUpperCase()} NEWS* ⭐

• *Title* - ${newsData.result.title || 'N/A'}
• *News* - ${newsData.result.desc || 'N/A'}
• *Date* - ${newsData.result.date || 'N/A'}
• *Link* - ${newsData.result.url || 'N/A'}
        `;

        await conn.sendMessage(
            groupJid,
            {
                image: { url: newsData.result.image || '' },
                caption: msg,
            },
            { quoted: mek }
        );

        reply(`✅ *${newsData.source} News* shared successfully to the group (${groupJid})!`);
    } catch (e) {
        console.error(`Error sending ${newsData.source} news to group:`, e);
        reply(`❌ Failed to share *${newsData.source} News* to the group. Please try again.`);
    }
};

// News Commands for Specific Sources
const createNewsCommand = (pattern, alias, sourceName, apiPath) => {
    cmd({
        pattern: pattern,
        alias: alias,
        react: "📰",
        desc: `Share ${sourceName} news to a group`,
        category: "news",
        use: `.${pattern} <group_jid>`,
        filename: __filename,
    },
    async (conn, mek, m, { args, reply }) => {
        if (args.length === 0) {
            return reply(`❌ Please provide a group JID.\nExample: .${pattern} 1234567890-123456789@g.us`);
        }

        const groupJid = args[0];
        try {
            const news = await fetchJson(`${apilink}/${apiPath}`);
            if (!news.result || !news.result.title) {
                return reply(`❌ No ${sourceName} news available right now.`);
            }

            await sendNewsToGroup(conn, mek, reply, { source: sourceName, result: news.result }, groupJid);
        } catch (e) {
            console.error(`Error fetching ${sourceName} news:`, e);
            reply(`❌ An error occurred while fetching ${sourceName} news.`);
        }
    });
};

// Hiru News Command
createNewsCommand("hirunews", ["hiru", "news1"], "Hiru", "hiru");

// Sirasa News Command
createNewsCommand("sirasanews", ["sirasa", "news2"], "Sirasa", "sirasa");

// Derana News Command
createNewsCommand("derananews", ["derana", "news3"], "Derana", "derana");
