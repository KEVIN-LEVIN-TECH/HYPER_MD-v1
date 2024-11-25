const { cmd } = require('../command');

// ========== KICK PLUGIN ==========
cmd({
    pattern: "kick",
    react: "❌",
    desc: "Remove members from the group.",
    category: "group",
    filename: __filename,
},
async (conn, mek, m, { from, isGroup, reply, groupAdmins, isAdmin }) => {
    try {
        // Check if the command is used in a group
        if (!isGroup) {
            return reply("❌ This command can only be used in groups.");
        }

        // Check if the user is an admin
        if (!isAdmin) {
            return reply("❌ Only group admins can use this command.");
        }

        // Request the phone numbers to kick
        const kickRequest = `
📤 Please reply to this message with the phone numbers of the members you want to remove.
- Format: Use international format (e.g., 947xxxxxxxx).
- Separate multiple numbers with commas (e.g., 947xxxxxxxx,947xxxxxxxx).

Example:
kick 94712345678,94787654321
        `;
        const msg = await conn.sendMessage(from, { text: kickRequest }, { quoted: mek });

        // Listen for the user response
        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const userResponse = msgUpdate.messages[0];
            if (!userResponse.message || !userResponse.message.conversation) return;

            const input = userResponse.message.conversation.trim();

            // Check if the response matches the `.kick` command
            if (
                userResponse.message.extendedTextMessage &&
                userResponse.message.extendedTextMessage.contextInfo &&
                userResponse.message.extendedTextMessage.contextInfo.stanzaId === mek.key.id
            ) {
                // Extract phone numbers
                const numbers = input.split(",").map(num => num.trim());

                // Validate phone numbers
                const invalidNumbers = [];
                const validNumbers = numbers.filter(num => {
                    if (/^\d{10,15}$/.test(num)) {
                        return true;
                    } else {
                        invalidNumbers.push(num);
                        return false;
                    }
                });

                // Notify if there are invalid numbers
                if (invalidNumbers.length > 0) {
                    await conn.sendMessage(from, { text: `❌ Invalid numbers: ${invalidNumbers.join(", ")}` }, { quoted: userResponse });
                }

                // Remove valid numbers from the group
                if (validNumbers.length > 0) {
                    try {
                        await conn.groupParticipantsUpdate(from, validNumbers, "remove");
                        await conn.sendMessage(from, { text: `✅ Successfully removed: ${validNumbers.join(", ")}` }, { quoted: userResponse });
                    } catch (error) {
                        console.error(error);
                        await conn.sendMessage(from, { text: `❌ Error removing members: ${error.message}` }, { quoted: userResponse });
                    }
                }
            }
        });
    } catch (error) {
        console.error(error);
        reply("❌ An error occurred while processing your request.");
    }
});
