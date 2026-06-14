const CrudController = require('../../../Flight-Service/src/controllers/crud.controller');
const EmailService = require('../services/email.service');
const successResponse = require('../utils/response');

class EmailController extends CrudController {
    constructor() {
        super(new EmailService());
        this.emailService = new EmailService();
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
