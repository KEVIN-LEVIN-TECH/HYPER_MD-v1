const { cmd } = require('../command'); // Command handler
const { jidDecode } = require('@adiwajshing/baileys'); // Baileys library for handling WhatsApp

cmd({
    pattern: "tagall",
    react: "📢",
    desc: "Tag all participants in the group",
    category: "group",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, reply }) => {
    try {
        // Check if the command is executed in a group
        if (!m.isGroup) {
            return reply("❌ This command can only be used in groups.");
        }

        // Get group metadata
        const group = await conn.groupMetadata(from);
        const participants = group.participants || [];

        // If no participants are found
        if (participants.length === 0) {
            return reply("❌ No participants found to tag.");
        }

        // Prepare mentions list and message
        let mentions = [];
        let mentionString = "";
        participants.forEach((user) => {
            mentions.push(user.id);
            mentionString += `@${jidDecode(user.id).user} `;
        });

        // Send the message tagging all participants
        await conn.sendMessage(from, {
            text: `📢 *Tagging All Participants in the Group:*\n\n${mentionString.trim()}${q ? `\n\n${q}` : ""}`,
            mentions: mentions,
        }, { quoted: mek });

    } catch (error) {
        console.error("Error in tagall command:", error);
        reply("❌ An error occurred while processing the tagall request. Please try again later.");
    }
});
