const mongoose = require('mongoose');
const serverConfig = require('./server.config');

async function connectDb() {
    if (serverConfig.NODE_ENV === 'development') {
        await mongoose.connect(serverConfig.DB_URL);
    } else {
        await mongoose.connect('prod db url');
    }
}

module.exports = connectDb;