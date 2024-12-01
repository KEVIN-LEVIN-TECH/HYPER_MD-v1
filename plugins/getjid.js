const { cmd } = require('../command');
const { fetchAllChats } = require('@adiwajshing/baileys');

cmd({
    pattern: "getjid",
    desc: "Get JID of a WhatsApp channel or group",
    category: "utility",
    filename: __filename,
}, async (conn, mek, m, { from, reply, args }) => {
    try {
        reply("🔍 Fetching JIDs...");

        // Fetch all chats
        const chats = await conn.chats.all();

        // Filter chats to find channels or groups
        const channelJIDs = chats
            .filter(chat => chat.jid && chat.jid.endsWith('@broadcast')) // For channels
            .map(chat => ({ name: chat.name, jid: chat.jid }));

        // Respond with channel JIDs
        if (channelJIDs.length > 0) {
            let response = "📢 *Channel JIDs Found:*\n";
            channelJIDs.forEach((channel, index) => {
                response += `\n${index + 1}. *${channel.name}*\nJID: ${channel.jid}`;
            });
            reply(response);
        } else {
            reply("❌ No channels found.");
        }
    } catch (error) {
        console.error("Error fetching JIDs:", error);
        reply("❌ Failed to fetch channel JIDs. Please try again later.");
    }
});
