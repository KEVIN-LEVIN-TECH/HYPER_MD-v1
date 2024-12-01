const axios = require('axios');

// Function to fetch buffer data from a URL
const getBuffer = async (url, options = {}) => {
    try {
        const res = await axios.get(url, { ...options, responseType: 'arraybuffer' });
        return res.data;
    } catch (err) {
        console.error("Error fetching buffer:", err);
        throw err;
    }
};

// Function to validate if a string is a URL
const isUrl = (url) => {
    return !!url.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/);
};

module.exports = { getBuffer, isUrl };
