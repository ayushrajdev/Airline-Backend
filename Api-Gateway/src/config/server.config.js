const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    PORT: process.env.PORT || 3000,
    DB_URL: process.env.DB_URL,
    NODE_ENV: process.env.NODE_ENV || 'development',
    FLIGHT_SERVICE_SERVER_URL: process.env.FLIGHT_SERVICE_SERVER_URL,
};
