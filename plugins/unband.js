const { cmd } = require('../command');

// Unban Command
cmd({
    pattern: "unban",
    react: "✅",
    alias: ["unblock"],
    category: "owner",
    use: ".unban <@mention/reply>",
    filename: __filename
},
async (conn, mek, m, { isOwner, reply, args, participants, quoted, sender, isGroup, groupMetadata }) => {
    try {
        // Check if the user is the bot owner
        if (!isOwner) {
            return await reply("❌ This command is for the bot owner only.");
        }

        // Check if the command is used with a mention or reply
        let target;
        if (m.mentionedJidList.length > 0) {
            target = m.mentionedJidList[0]; // Target from mention
        } else if (quoted) {
            target = quoted.sender; // Target from reply
        } else if (args.length > 0) {
            target = args[0]; // Target from manual input
        } else {
            return await reply("❌ Please mention or reply to a user to unban.");
        }

        // Attempt to unblock the user
        await conn.updateBlockStatus(target, "unblock");

        // Send confirmation
        await reply(`✅ Successfully unbanned: ${target}`);
    } catch (error) {
        console.error("Error in unban plugin: ", error);
        await reply("❌ An error occurred while unbanning the user.");
    }
});
