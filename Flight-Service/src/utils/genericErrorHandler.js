const { StatusCodes } = require('http-status-codes');
const BaseError = require('../errors/BaseError');
const logger = require('../config/logger.config');

function genericErrorHandler(err, req, res, next) {
    logger.info('Error', err);

    if (err instanceof BaseError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            error: err.details,
            data: {}, // because it's an exception
        });
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Something went wrong',
        error: err,
        data: {}, // because it's an exception
    });
}

module.exports = genericErrorHandler;