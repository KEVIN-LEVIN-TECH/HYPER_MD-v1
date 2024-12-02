const { cmd } = require('../command');
const { fetchJson } = require('../lib/functions');
const axios = require('axios');

// Store session information for ongoing interactions
let session = {};

cmd({
  pattern: "tiktoksearch",
  alias: ["tiks"],
  use: '.tiktoksearch <query>',
  react: "🔍",
  desc: "Search and DOWNLOAD VIDEOS from TikTok.",
  category: "search",
  filename: __filename
},
async (messageHandler, context, quotedMessage, { from, q, reply }) => {
  try {
    if (!q) return reply('Please Provide Search Terms.');

    // Fetch TikTok search results from the API
    let res = await fetchJson(`https://apis-starlights-team.koyeb.app/starlight/tiktoksearch?text=${q}`);
    let data = res.data;

    // If no results, send a failure message
    if (data.length < 1) return await messageHandler.sendMessage(from, { text: " *I Couldn't Find Anything*" }, { quoted: quotedMessage });

    let message = `乂 HYPER-MD TIK TOK SEARCH\n\n_Search Results..✓_ "${q}":\n\n`;
    let options = '';

    // Create a list of video results
    data.forEach((v, index) => {
      options += `${index + 1}. ${v.title} (Creator: ${v.creator})\n`;
    });

    message += options;
    message += `\n\n©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ `;

    // Send the list of search results to the user
    const sentMessage = await messageHandler.sendMessage(from, {
      image: { url: `https://files.catbox.moe/de82e3.jpg`},
      caption: message,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
      }
    }, { quoted: quotedMessage });

    // Store session information for the user
    session[from] = {
      searchResults: data,
      messageId: sentMessage.key.id,  // Store message ID for future reference
    };

    // Function to handle the user reply
    const handleUserReply = async (update) => {
      const userMessage = update.messages[0];

      // Ensure this message is a reply to the original prompt
      if (!userMessage.message.extendedTextMessage ||
          userMessage.message.extendedTextMessage.contextInfo.stanzaId !== sentMessage.key.id) {
        return;
      }

      const userReply = userMessage.message.extendedTextMessage.text.trim();
      const videoIndexes = userReply.split(',').map(x => parseInt(x.trim()) - 1); // Convert reply to an array of indexes

      // Check if all selected indexes are valid
      for (let index of videoIndexes) {
        if (isNaN(index) || index < 0 || index >= data.length) {
          return reply(" Please Enter Valid Numbers From The List.");
        }
      }

      // Fetch and send videos for each valid index
      for (let index of videoIndexes) {
        const selectedVideo = data[index];

        try {
          // Send the selected video to the user
          await messageHandler.sendMessage(from, {
            video: { url: selectedVideo.nowm }, // Direct video URL for download
            caption: `${selectedVideo.title}\n\n©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ `,
          }, { quoted: quotedMessage });
        } catch (err) {
          console.error(err);
          return reply(` An Error Occurred While Downloading...\n "${selectedVideo.title}".`);
        }
      }

      // After a selection, clear the session for that user (this is important to prevent unwanted interactions)
      delete session[from];
    };

    // Attach the listener for user replies
    messageHandler.ev.on("messages.upsert", handleUserReply);

  } catch (error) {
    console.error(error);
    await messageHandler.sendMessage(from, { text: '*Error Occurred During The Process!*' }, { quoted: quotedMessage });
  }
});
