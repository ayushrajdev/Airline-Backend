const { MongoClient } = require('mongodb');
const winston = require('winston');
require('winston-mongodb');

const { format, transports } = winston;

const logger = winston.createLogger({
    level: 'info',
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'app.log' }),
    ],
    format: format.combine(
        format.colorize(),
        format.timestamp({
            format: 'DD-MM-YYYY HH:mm:ss',
        }),
        format.printf(
            ({ timestamp, level, message }) =>
                `${timestamp} [${level}] : ${message}`
        )
    ),
});

async function initializeMongoLogger() {
    try {
        const url = 'mongodb://localhost:27017/logs';

        const client = new MongoClient(url);
        await client.connect();

        logger.add(
            new transports.MongoDB({
                db: client,
                collection: 'log',
                level: 'error',
            })
        );

        logger.info('MongoDB logger initialized');
    } catch (error) {
        logger.error('Failed to initialize MongoDB logger', error);
    }
}

initializeMongoLogger();

module.exports = logger;