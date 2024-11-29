const { cmd } = require('../command');

// Ban Command
cmd({
    pattern: "ban",
    react: "⛔",
    alias: ["block"],
    category: "owner",
    use: ".ban <@mention/reply>",
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
            return await reply("❌ Please mention or reply to a user to ban.");
        }

        // Attempt to block the user
        await conn.updateBlockStatus(target, "block");

        // Send confirmation
        await reply(`⛔ Successfully banned: ${target}`);
    } catch (error) {
        console.error("Error in ban plugin: ", error);
        await reply("❌ An error occurred while banning the user.");
    }
});
