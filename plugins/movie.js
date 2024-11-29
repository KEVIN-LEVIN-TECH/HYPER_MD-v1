const { cmd } = require('../command');
const axios = require('axios');

// OMDB API Configurations
const OMDB_API_KEY = "http://www.omdbapi.com/apikey.aspx?VERIFYKEY=352521ac-e9dd-496a-bd35-99d31edf5129"; 
const OMDB_API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=b20bb70";

cmd({
    pattern: "movie",
    react: "🎥",
    desc: "Search movies and suggest streaming/download links",
    category: "movie",
    use: ".movie <movie name>",
    filename: __filename,
},
async (conn, mek, m, { args, reply }) => {
    try {
        // Validate input
        if (args.length === 0) {
            return reply("❌ Please provide a movie name. Example: `.movie Inception`");
        }

        const movieName = args.join(" ");
        const response = await axios.get(OMDB_API_URL, {
            params: {
                t: movieName,
                apikey: OMDB_API_KEY,
            },
        });

        if (response.data.Response === "False") {
            return reply(`❌ Movie not found: ${movieName}`);
        }

        const movie = response.data;

        // Suggested Streaming Platforms
        const streamingLinks = `
🔗 Suggested Streaming Platforms:
1. [Netflix](https://www.netflix.com/search?q=${encodeURIComponent(movieName)})
2. [Amazon Prime](https://www.amazon.com/s?k=${encodeURIComponent(movieName)})
3. [Disney+](https://www.disneyplus.com/search?q=${encodeURIComponent(movieName)})
4. [Hulu](https://www.hulu.com/search?q=${encodeURIComponent(movieName)})
5. [YTS (Unofficial)](https://yts.mx/browse-movies/${encodeURIComponent(movieName)}/all/all/0/latest)
        `;

        const movieDetails = `
🎬 Title: ${movie.Title}
🗓 Year: ${movie.Year}
⭐ IMDB Rating: ${movie.imdbRating}
📚 Genre: ${movie.Genre}
🎭 Actors: ${movie.Actors}
📝 Plot: ${movie.Plot}
🌐 IMDB Link: [Click Here](https://www.imdb.com/title/${movie.imdbID}/)

${streamingLinks}

© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴇɴᴇꜱʜ
        `;

        // Send movie details with links
        await conn.sendMessage(
            m.chat,
            { text: movieDetails },
            { quoted: mek }
        );

    } catch (error) {
        console.error("Error in movie plugin:", error);
        reply("❌ An error occurred while fetching movie details. Please try again.");
    }
});
