function successResponse(res, { statusCode = 200, message, data }) {
    return res.status(statusCode).json({
        success: true,
        message: message || 'Success response',
        data: data || {},
        error: {},
    });
}

module.exports = successResponse;
