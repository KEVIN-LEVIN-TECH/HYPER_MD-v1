const { readEnv } = require('../lib/database');
const { cmd, commands } = require('../command');

cmd({
    pattern: "menu",
    react: '📜',
    desc: "Get the list of commands",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { 
    from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply 
}) => {
    try {
        const config = await readEnv();
        let menu = {
            main: '',
            download: '',
            group: '',
            owner: '',
            convert: '',
            search: '',
        };

        // Categorize commands into sections
        for (let i = 0; i < commands.length; i++) {
            if (commands[i].pattern && !commands[i].dontAddCommandList) {
                menu[commands[i].category] += `${config.PREFIX}${commands[i].pattern}\n`;
            }
        }

        // Prompt user to select a menu
        const selectionMessage = `
Hello 👋 ${pushname},

╭━━━━ Cᴏᴍᴍᴀɴᴅꜱ Pᴀɴᴇʟ━━━━━━
│ Ram usage: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
│ Prefix: ${config.PREFIX}
│ Versions: 1.0.0
╰━━━━━━━━━━━━━━━━━━━ 

 Hʏᴘᴇʀ-MD Cᴏᴍᴍᴀɴᴅꜱ Pᴀɴᴇʟ

🔢 Reply Below Number

1| DOWNLOAD MENU
2| MAIN MENU
3| GROUP MENU
4| OWNER MENU
5| CONVERT MENU
6| SEARCH MENU

©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ 
`;

        const sentMessage = await conn.sendMessage(from, {
            text: selectionMessage,
        }, { quoted: mek });

        // Wait for the user's response
        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            // Check if the reply is valid and related to the menu prompt
            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === sentMessage.key.id) {
                let selectedMenu;

                switch (selectedOption) {
                    case '1': // DOWNLOAD MENU
                        selectedMenu = `DOWNLOAD MENU\n\n${menu.download}`;
                        break;
                    case '2': // MAIN MENU
                        selectedMenu = `MAIN MENU\n\n${menu.main}`;
                        break;
                    case '3': // GROUP MENU
                        selectedMenu = `GROUP MENU\n\n${menu.group}`;
                        break;
                    case '4': // OWNER MENU
                        selectedMenu = `OWNER MENU\n\n${menu.owner}`;
                        break;
                    case '5': // CONVERT MENU
                        selectedMenu = `CONVERT MENU\n\n${menu.convert}`;
                        break;
                    case '6': // SEARCH MENU
                        selectedMenu = `SEARCH MENU\n\n${menu.search}`;
                        break;
                    default:
                        return reply("Invalid option. Please reply with a valid number.");
                }

                // Send the selected menu
                await conn.sendMessage(from, {
                    text: selectedMenu,
                }, { quoted: mek });

                // Send an image related to the menu
                await conn.sendMessage(from, {
                    image: { url: 'https://i.ibb.co/1zTvSVj/20241123-121425.jpg' },
                    caption:madeMenu,
                }, { quoted: mek });
            }
        });

    } catch (e) {
        console.error(e);
        reply(`An error occurred: ${e.message}`);
    }
});
