const { cmd } = require('../command');

// Define the group JID command
cmd({
    pattern: "jid",
    react: "🌐",
    alias: ["jid", "groupid"],
    category: "group",
    use: ".getjid",
    filename: __filename
},
async (conn, mek, m, { isGroup, groupMetadata, reply }) => {
    try {
        // Check if the command is used inside a group
        if (!isGroup) {
            return await reply("❌ This command can only be used in groups.");
        }

        // Fetch the group JID
        const groupJid = groupMetadata.id;

        // Send the JID to the user
        await reply(`✅ Group JID: \n\n${groupJid}\n\n©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ `);
    } catch (error) {
        console.error("Error fetching group JID: ", error);
        await reply("❌ An error occurred while fetching the group JID.");
    }
});
