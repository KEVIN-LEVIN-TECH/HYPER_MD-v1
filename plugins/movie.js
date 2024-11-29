const { cmd } = require('../command');
const axios = require('axios');

const OMDB_API_KEY = "http://www.omdbapi.com/?i=tt3896198&apikey=b20bb70"; 
const OMDB_API_URL = "http://www.omdbapi.com/apikey.aspx?VERIFYKEY=352521ac-e9dd-496a-bd35-99d31edf5129";

cmd({
    pattern: "movie",
    react: "🎥",
    category: "search",
    use: ".movie <movie name>",
    filename: __filename
},
async (conn, mek, m, { args, reply }) => {
    try {
        if (args.length === 0) {
            return reply("❌ Please provide a movie name. Example: `.movie Inception`");
        }

        const movieName = args.join(" ");
        const response = await axios.get(OMDB_API_URL, {
            params: {
                t: movieName,
                apikey: OMDB_API_KEY
            }
        });

        if (response.data.Response === "False") {
            return reply(`❌ Movie not found: ${movieName}`);
        }

        const movie = response.data;

        // Prepare movie details
        const movieDetails = `
🎬 Title: ${movie.Title}
🗓 Year: ${movie.Year}
⭐ IMDB Rating: ${movie.imdbRating}
📚 Genre: ${movie.Genre}
🎭 Actors: ${movie.Actors}
📝 Plot: ${movie.Plot}
🌐 IMDB Link: https://www.imdb.com/title/${movie.imdbID}/

🔗 Download Suggestion: Try searching on platforms like YTS or other movie download sites.

©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ 
        `;

        // Send movie details
        await conn.sendMessage(m.chat, { text: movieDetails }, { quoted: mek });

    } catch (error) {
        console.error("Error in movie plugin:", error);
        await reply("❌ An error occurred while fetching movie details.");
    }
});
