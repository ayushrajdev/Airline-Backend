const BaseError = require('./BaseError');

class NotFoundError extends BaseError {
    constructor(details) {
        super(
            'Not Found Error',
            404,
            'Resource not found',
            details
        );
    }
}

module.exports = NotFoundError;