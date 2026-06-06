const { StatusCodes } = require('http-status-codes');
const BaseError = require('./BaseError');

class BadRequestError extends BaseError {
    constructor(propertyName, details) {
        super(
            'BadRequest',
            StatusCodes.BAD_REQUEST,
            `Invalid ${propertyName} provided`,
            details
        );
    }
}

module.exports = BadRequestError;