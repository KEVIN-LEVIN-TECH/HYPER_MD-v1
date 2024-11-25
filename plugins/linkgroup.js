const { cmd } = require('../command');

// ========== LINK GROUP PLUGIN ==========
cmd({
    pattern: "linkgroup",
    react: "🔗",
    desc: "Get the invitation link of the group.",
    category: "group",
    filename: __filename,
},
async (conn, mek, m, { from, isGroup, reply, groupAdmins, isAdmin, isBotAdmin }) => {
    try {
        // Check if the command is used in a group
        if (!isGroup) {
            return reply("❌ This command can only be used in groups.");
        }

        // Check if the bot is an admin
        if (!isBotAdmin) {
            return reply("❌ I need to be an admin to fetch the group link.");
        }

        // Fetch the group link
        const groupInvite = await conn.groupInviteCode(from);
        const groupLink = `https://chat.whatsapp.com/${groupInvite}`;

        // Send the group link
        const message = `
🔗 Group Invitation Link


╭───────────────────────◆•◆
│ Here is the link to join the group
│
│ 🌐 [Click to Join](${groupLink})
╰───────────────────────◆•◆

Share this link responsibly. Admins can reset this link at any time.

©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ 
        `;
        await conn.sendMessage(from, { text: message }, { quoted: mek });
    } catch (error) {
        console.error(error);
        reply("❌ An error occurred while fetching the group link.");
    }
});
