const CrudController = require('../../../Flight-Service/src/controllers/crud.controller');
const EmailService = require('../services/email.service');
const successResponse = require('../utils/response');

class EmailController extends CrudController {
    constructor() {
        super(new EmailService());
        this.emailService = new EmailService();
    }

    async sendMail(req, res, next) {
        const { from, html, subject, text, to } = req.body;
        if (!to || !subject || (!text && !html)) {
            return res.status(400).json({ error: 'Missing required fields.' });
        }

        try {
            const response = this.emailService.sendMail({
                from,
                html,
                subject,
                text,
                to,
            });
            return successResponse(res);
        } catch (error) {
            throw error;
        }
    }

    async getPendingTickets() {
        try {
            const response = await this.getPendingTickets();
            return response;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = EmailController;
