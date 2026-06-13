const { StatusCodes } = require('http-status-codes');
const BaseError = require('./BaseError');

class NotImplementedError extends BaseError {
    constructor(methodName) {
        super(
            'Not Implemented',
            StatusCodes.NOT_IMPLEMENTED,
            `Not Implemented ${methodName}`,
            {}
        );
    }
}

module.exports = NotImplementedError;