const { StatusCodes } = require('http-status-codes');
const BaseError = require('./BaseError');

class InternalServerError extends BaseError {
    constructor(details) {
        super(
            'BadRequest',
            StatusCodes.INTERNAL_SERVER_ERROR,
            'Internal server error !! please try after sometime',
            details
        );
    }
}

module.exports = InternalServerError;