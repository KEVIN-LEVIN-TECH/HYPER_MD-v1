const { cmd } = require('../command');

// ========== GROUP ADD PLUGIN ==========
cmd({
    pattern: "add",
    react: "➕",
    desc: "Add members to the group.",
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

        // Request the phone numbers to add
        const addRequest = `
📥 Please reply to this message with the phone numbers of the members you want to add.
- Format: Use international format (e.g., 947xxxxxxxx).
- Separate multiple numbers with commas (e.g., 947xxxxxxxx,947xxxxxxxx).

Example:
add 94712345678,94787654321
        `;
        const msg = await conn.sendMessage(from, { text: addRequest }, { quoted: mek });

        // Listen for the user response
        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const userResponse = msgUpdate.messages[0];
            if (!userResponse.message || !userResponse.message.conversation) return;

            const input = userResponse.message.conversation.trim();

            // Check if the response matches the `.add` command
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

                // Add valid numbers to the group
                if (validNumbers.length > 0) {
                    try {
                        await conn.groupParticipantsUpdate(from, validNumbers, "add");
                        await conn.sendMessage(from, { text: `✅ Successfully added: ${validNumbers.join(", ")}` }, { quoted: userResponse });
                    } catch (error) {
                        console.error(error);
                        await conn.sendMessage(from, { text: `❌ Error adding members: ${error.message}` }, { quoted: userResponse });
                    }
                }
            }
        });
    } catch (error) {
        console.error(error);
        reply("❌ An error occurred while processing your request.");
    }
});
