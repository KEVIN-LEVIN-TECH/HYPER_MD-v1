const { cmd } = require('../command'); // Command Module
const { default: makeWASocket } = require('@whiskeysockets/baileys'); // Baileys Module

//----------------------------------------------- Get Group Admins -----------------------------------------------
cmd({
    pattern: "admins",
    desc: "Get a list of group admins.",
    react: "👥",
    category: "group",
    filename: __filename,
}, async (conn, mek, m, { from, reply }) => {
    try {
        const groupMetadata = await conn.groupMetadata(from);
        const admins = groupMetadata.participants
            .filter(participant => participant.admin === 'admin' || participant.admin === 'superadmin')
            .map(admin => `@${admin.id.split('@')[0]}`)
            .join('\n');

        if (!admins) return reply("No admins found in this group.");

        await conn.sendMessage(from, {
            text: `Group Admins:\n\n${admins}`,
            mentions: groupMetadata.participants
                .filter(participant => participant.admin === 'admin' || participant.admin === 'superadmin')
                .map(admin => admin.id),
        }, { quoted: mek });
    } catch (e) {
        console.error(e);
        reply("Error: Unable to fetch group admins.");
    }
});

//----------------------------------------------- Get Group Info -----------------------------------------------
cmd({
    pattern: "groupinfo",
    desc: "Get information about the group.",
    react: "📄",
    category: "group",
    filename: __filename,
}, async (conn, mek, m, { from, reply }) => {
    try {
        const groupMetadata = await conn.groupMetadata(from);

        const groupInfo = `
Group Name: ${groupMetadata.subject}
Group Description: ${groupMetadata.desc || 'No description'}
Members: ${groupMetadata.participants.length}
Created At: ${new Date(groupMetadata.creation * 1000).toLocaleString()}
        `;

        await conn.sendMessage(from, { text: groupInfo }, { quoted: mek });
    } catch (e) {
        console.error(e);
        reply("Error: Unable to fetch group information.");
    }
});

//----------------------------------------------- Get Group Invite Link -----------------------------------------------
cmd({
    pattern: "grouplink",
    desc: "Get the group's invite link.",
    react: "🔗",
    category: "group",
    filename: __filename,
}, async (conn, mek, m, { from, reply }) => {
    try {
        const inviteLink = await conn.groupInviteCode(from);

        await conn.sendMessage(from, {
            text: `Group Invite Link: https://chat.whatsapp.com/${inviteLink}`,
        }, { quoted: mek });
    } catch (e) {
        console.error(e);
        reply("Error: Unable to fetch group invite link.");
    }
});

//----------------------------------------------- Mention All Members -----------------------------------------------
cmd({
    pattern: "tagall",
    desc: "Mention all group members.",
    react: "📢",
    category: "group",
    filename: __filename,
}, async (conn, mek, m, { from, reply }) => {
    try {
        const groupMetadata = await conn.groupMetadata(from);
        const members = groupMetadata.participants.map(participant => `@${participant.id.split('@')[0]}`).join('\n');

        await conn.sendMessage(from, {
            text: `Tagging All Members:\n\n${members}`,
            mentions: groupMetadata.participants.map(participant => participant.id),
        }, { quoted: mek });
    } catch (e) {
        console.error(e);
        reply("Error: Unable to mention all members.");
    }
});

//----------------------------------------------- Set Group Description -----------------------------------------------
cmd({
    pattern: "groupdesc",
    desc: "Change the group description.",
    use: ".groupdesc <new description>",
    react: "📝",
    category: "group",
    filename: __filename,
}, async (conn, mek, m, { from, args, isAdmins, reply }) => {
    try {
        if (!isAdmins) return reply("You must be an admin to use this command.");
        if (!args.length) return reply("Please provide a new description.");

        const newDesc = args.join(' ');
        await conn.groupUpdateDescription(from, newDesc);

        reply(`Group description updated to:\n\n${newDesc}`);
    } catch (e) {
        console.error(e);
        reply("Error: Unable to update group description.");
    }
});
