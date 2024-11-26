const { cmd } = require('../command');

// ========== PROMOTE PLUGIN ==========
cmd({
    pattern: "promote",
    react: "⬆️",
    desc: "Promote a group member to admin.",
    category: "group",
    filename: __filename,
},
async (conn, mek, m, { from, isGroup, reply, isAdmin, isBotAdmin }) => {
    try {
        // Check if the command is used in a group
        if (!isGroup) {
            return reply("❌ This command can only be used in groups.");
        }

        // Check if the bot is an admin
        if (!isBotAdmin) {
            return reply("❌ I need to be an admin to promote members.");
        }

        // Check if the user is an admin
        if (!isAdmin) {
            return reply("❌ Only group admins can use this command.");
        }

        // Check if a member is tagged
        const mentioned = mek.message?.extendedTextMessage?.mentionedJid || [];
        if (mentioned.length === 0) {
            return reply("❌ Please tag the member you want to promote.");
        }

        // Promote the tagged member
        await conn.groupParticipantsUpdate(from, mentioned, "promote");
        reply(`✅ Successfully promoted: ${mentioned.map(id => `@${id.split("@")[0]}`).join(", ")}`, { mentions: mentioned });
    } catch (error) {
        console.error(error);
        reply("❌ An error occurred while promoting the member.");
    }
});

// ========== DEMOTE PLUGIN ==========
cmd({
    pattern: "demote",
    react: "⬇️",
    desc: "Demote an admin to a regular member.",
    category: "group",
    filename: __filename,
},
async (conn, mek, m, { from, isGroup, reply, isAdmin, isBotAdmin }) => {
    try {
        // Check if the command is used in a group
        if (!isGroup) {
            return reply("❌ This command can only be used in groups.");
        }

        // Check if the bot is an admin
        if (!isBotAdmin) {
            return reply("❌ I need to be an admin to demote members.");
        }

        // Check if the user is an admin
        if (!isAdmin) {
            return reply("❌ Only group admins can use this command.");
        }

        // Check if a member is tagged
        const mentioned = mek.message?.extendedTextMessage?.mentionedJid || [];
        if (mentioned.length === 0) {
            return reply("❌ Please tag the admin you want to demote.");
        }

        // Demote the tagged member
        await conn.groupParticipantsUpdate(from, mentioned, "demote");
        reply(`✅ Successfully demoted: ${mentioned.map(id => `@${id.split("@")[0]}`).join(", ")}`, { mentions: mentioned });
    } catch (error) {
        console.error(error);
        reply("❌ An error occurred while demoting the member.");
    }
});
