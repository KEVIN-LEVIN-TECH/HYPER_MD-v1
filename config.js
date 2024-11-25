const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || 'sVRl2aTB#Glpe7siUwqHUsOnIjt2CXfXf_QZgTFyAD5H_OXLFOXA',
MONGODB: process.env.MONGODB || "mongodb://mongo:eGvcAWHazvNfBszykPSFbtLHXdlVzjil@junction.proxy.rlwy.net:15727",
};
