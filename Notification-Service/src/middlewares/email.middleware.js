function validateEmail(req, res, next) {
    const { subject, content, recepientEmail } = req.body;
    req.body = { subject, content, recepientEmail };
    next();
}

module.exports = { validateEmail };
