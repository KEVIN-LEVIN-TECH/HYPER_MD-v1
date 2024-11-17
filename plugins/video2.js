const fs = require('fs');
const { downloadMediaMessage } = require('@whiskeysockets/baileys');

module.exports = {
  pattern: 'video', 
  alias: ['dlvideo'], 
  react: '📽️', 
  function: async (conn, mek, m, extra) => {
    const { quoted, reply } = extra;

    if (!quoted || !quoted.message.videoMessage) {
      return reply('Please reply to a video message to download it!');
    }

    try {
      reply('Downloading video... ⏳');

      const mediaBuffer = await downloadMediaMessage(
        quoted, 
        'buffer', 
        {}, 
        { logger: console } 
      );

      const fileName = `video_${Date.now()}.mp4`;
      fs.writeFileSync(fileName, mediaBuffer); 

      reply(`✅ Video downloaded successfully! Saved as: ${fileName}`);
    } catch (error) {
      console.error(error);
      reply('❌ Failed to download the video.');
    }
  },
};
