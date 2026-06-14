const express = require('express');
const EmailService = require('../../services/email.service');
const EmailController = require('../../controllers/email.controller');
const { validateEmail } = require('../../middlewares/email.middleware');

const router = express.Router();

const emailController = new EmailController();

router.post('/tickets', validateEmail, emailController.create);
router.get('/pending-tickets', emailController.getPendingTickets);

module.exports = router;
