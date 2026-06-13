const express = require('express');
const UserController = require('../../controllers/user.controller');
const validateSignUpRequestBody = require('../../middlewares/user.middleware');
const router = express.Router();

const userController = new UserController();

router.post('/sign-up', validateSignUpRequestBody, userController.create);
router.post('/sign-in', userController.signin);

module.exports = router;
