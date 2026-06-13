const UserService = require('../services/user.service');

function validateSignUpRequestBody(req, res, next) {
    req.body = {
        email: req.body.email,
        password: req.body.password,
    };
    next();
}

async function checkAuth(req, res, next) {
    try {
        const response = await UserService.isAuthenticated(
            req.headers['x-access-token'],
        );
        if (response) {
            req.user = response; // setting the user id in the req object
            next();
        }
    } catch (error) {
        return res.status(error.statusCode).json(error);
    }
}
module.exports = { validateSignUpRequestBody, checkAuth };
