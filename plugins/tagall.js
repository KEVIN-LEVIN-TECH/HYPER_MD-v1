const { cmd } = require('../command');
const { groupMetadata } = require('@adiwajshing/baileys'); // Use Baileys or any WhatsApp library you're using

cmd({
    pattern: "tagall",
    react: "📢",
    desc: "Tag all participants in the group",
    category: "group",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, reply }) => {
    try {
        // Get group metadata to retrieve the participants
        const group = await conn.groupMetadata(from);
        const participants = group.participants || [];

        // Prepare the list of mentions
        let mentions = [];
        let mentionString = "";
        for (let i = 0; i < participants.length; i++) {
            const user = participants[i];
            mentions.push(user.id);
            mentionString += `@${user.id.split('@')[0]} `;
        }

        // If no participants are found
        if (participants.length === 0) {
            return reply("❌ No participants found to tag.");
        }

        // Send the message to the group with mentions
        await conn.sendMessage(from, {
            text: `📢 Tagging All Participants in the Group:\n\n${mentionString}\n${q ? q : "Gruop Adming!"}`,
            mentions: mentions
        }, { quoted: mek });

    } catch (error) {
        console.error("Error in tagall command:", error);
        reply("❌ An error occurred while processing the tagall request. Please try again later.");
    }
});
