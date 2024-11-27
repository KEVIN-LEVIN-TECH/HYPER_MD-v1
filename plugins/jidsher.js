const { cmd } = require('../command');
const { SinhalaSub } = require('@sl-code-lords/movie-api');
const { PixaldrainDL } = require("pixaldrain-sinhalasub");

// JID Share Command (share)
cmd({
    pattern: "jshare",
    desc: "Share movie details, quality options, and download link with a JID (group or contact).",
    category: "movie",
    react: "🔗",
    use: "<JID> <movie title>",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        const args = q.trim().split(" ");
        const jid = args[0]; // JID of the group or contact
        const movieTitle = args.slice(1).join(" ");

        if (!jid || !movieTitle) return reply("Please provide both the JID and the movie title.");
        
        // Step 1: Search for the movie by title
        const result = await SinhalaSub.get_list.by_search(movieTitle);
        if (!result.status || result.results.length === 0) return reply("No results found for the specified movie.");

        const selectedMovie = result.results[0]; // Take the first result
        const link = selectedMovie.link;

        // Step 2: Fetch movie details from the selected movie's link
        const movieDetails = await SinhalaSub.movie(link);
        if (!movieDetails || !movieDetails.status || !movieDetails.result) {
            return reply("❗ Movie details not found.");
        }

        const movie = movieDetails.result;
        let movieMessage = `${movie.title}\n\n`;
        movieMessage += `📅 𝖱𝖾𝗅𝖾𝖺𝗌𝖾 𝖣𝖺𝗍𝖾: ${movie.release_date}\n`;
        movieMessage += `🗺 𝖢𝗈𝗎𝗇𝗍𝗋𝗒: ${movie.country}\n`;
        movieMessage += `⏰ 𝖣𝗎𝗋𝖺𝗍𝗂𝗈𝗇: ${movie.duration}\n`;

            // Handling genres properly
            const genres = Array.isArray(movie.genres) ? movie.genres.join(', ') : movie.genres;
            movieMessage += `🎭 𝖦𝖾𝗇𝖾𝗋𝖾𝗌: ${genres}\n`;

        movieMessage += `⭐ 𝖨𝗆𝖽𝖻 𝖱𝖺𝗍𝗂𝗇𝗀: ${movie.IMDb_Rating}\n`;
        movieMessage += `🎬 𝖣𝗂𝗋𝖾𝖼𝗍𝗈𝗋: ${movie.director.name}\n\n`;
         movieMessage += `🔗 𝖣𝗈𝗐𝗇𝗅𝗈𝖺𝖽 𝖫𝗂𝗇𝗄: ${link}`;
        movieMessage += `\n\n乂 REPLY BELOW NUMBER\n\n`;
        movieMessage += `1 | 𝖲𝖣 - 480𝗉\n`;
        movieMessage += `2 | 𝖧𝖣 - 720p\n`;
        movieMessage += `3 | 𝖥𝖧𝖣 - 1080p\n\n`;
        movieMessage += `> ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ `;

        const imageUrl = movie.images && movie.images.length > 0 ? movie.images[0] : null;

        // Step 3: Share the movie details and download quality options with the JID
        await conn.sendMessage(jid, {
            image: { url: imageUrl },
            caption: movieMessage
        });

        // Wait for JID to select quality
        const qualityListener = async (update) => {
            const message = update.messages[0];

            if (!message.message || !message.message.extendedTextMessage) return;

            const userReply = message.message.extendedTextMessage.text.trim();

            if (userReply === 'SD' || userReply === 'HD' || userReply === 'FHD') {
                let quality;
                switch (userReply) {
                    case '1':
                        quality = "SD 480p";
                        break;
                    case '2':
                        quality = "HD 720p";
                        break;
                    case '3':
                        quality = "FHD 1080p";
                        break;
                }

                // Get the direct download link
                const directLink = await PixaldrainDL(link, quality, "direct");
                if (directLink) {
                    // Send the download link to the JID
                    await conn.sendMessage(jid, {
                        document: {
                            url: directLink
                        },
                        mimetype: 'video/mp4',
                        fileName: `🎬ʜʏᴘᴇʀ-ᴍᴅ ᴍᴏᴠɪᴇꜱ🎬(${movie.title}).mp4`,
                        caption: `${movie.title} - ${quality}\n\n> ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ `
                    });
                }
            }
        };

        // Register the quality listener for this JID
        conn.ev.on("messages.upsert", qualityListener);

        // Clean up the listener after 60 seconds to prevent memory leaks
        setTimeout(() => {
            conn.ev.off("messages.upsert", qualityListener);
        }, 60000);

    } catch (err) {
        console.log(err);
        return reply(`❗ Error: ${err.message}`);
    }
});
