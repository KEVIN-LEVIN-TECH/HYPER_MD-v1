const config = require('../config')
const { cmd } = require('../command')
const { fetchJson } = require('../lib/functions')

const apilink = 'https://dark-yasiya-news-apis.vercel.app/api' // API LINK

// ================================ DYNAMIC NEWS COMMAND ================================
const sendNewsToGroup = async (conn, from, mek, reply, newsData, groupJid) => {
    const msg = `
           ⭐ ${newsData.source.toUpperCase()} NEWS ⭐

• Title - ${newsData.result.title}

• News - ${newsData.result.desc}

• Date - ${newsData.result.date || 'N/A'}

• Link - ${newsData.result.url}

©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ `;

    await conn.sendMessage(
        groupJid,
        { image: { url: newsData.result.image || '' }, caption: msg },
        { quoted: mek }
    );

    reply(`✅ ${newsData.source} News shared successfully to the group (${groupJid})!`);
};

// News Commands with Dynamic Group JID
cmd({
    pattern: "hirunews",
    alias: ["hiru", "news1"],
    react: "⭐",
    desc: "Share HIRU news to a group",
    category: "news",
    use: '.hirunews <group_jid>',
    filename: __filename
},
async (conn, mek, m, { from, quoted, args, reply }) => {
    if (args.length === 0) return reply("❌ Please provide a group JID. Example: `.hirunews 1234567890-123456789@g.us`");

    const groupJid = args[0];
    try {
        const news = await fetchJson(`${apilink}/hiru`);
        await sendNewsToGroup(conn, from, mek, reply, { source: "Hiru", result: news.result }, groupJid);
    } catch (e) {
        console.error(e);
        reply("❌ An error occurred while fetching HIRU news.");
    }
});

cmd({
    pattern: "sirasanews",
    alias: ["sirasa", "news2"],
    react: "🔺",
    desc: "Share Sirasa news to a group",
    category: "news",
    use: '.sirasanews <group_jid>',
    filename: __filename
},
async (conn, mek, m, { from, quoted, args, reply }) => {
    if (args.length === 0) return reply("❌ Please provide a group JID. Example: `.sirasanews 1234567890-123456789@g.us`");

    const groupJid = args[0];
    try {
        const news = await fetchJson(`${apilink}/sirasa`);
        await sendNewsToGroup(conn, from, mek, reply, { source: "Sirasa", result: news.result }, groupJid);
    } catch (e) {
        console.error(e);
        reply("❌ An error occurred while fetching Sirasa news.");
    }
});

cmd({
    pattern: "derananews",
    alias: ["derana", "news3"],
    react: "📑",
    desc: "Share Derana news to a group",
    category: "news",
    use: '.derananews <group_jid>',
    filename: __filename
},
async (conn, mek, m, { from, quoted, args, reply }) => {
    if (args.length === 0) return reply("❌ Please provide a group JID. Example: `.derananews 1234567890-123456789@g.us`");

    const groupJid = args[0];
    try {
        const news = await fetchJson(`${apilink}/derana`);
        await sendNewsToGroup(conn, from, mek, reply, { source: "Derana", result: news.result }, groupJid);
    } catch (e) {
        console.error(e);
        reply("❌ An error occurred while fetching Derana news.");
    }
});
