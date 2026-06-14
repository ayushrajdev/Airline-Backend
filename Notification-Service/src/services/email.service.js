const sendMail = require('../config/node-mailer.config');
const TicketRepository = require('../repositories/ticket.repository');
const CrudService = require('./crud.service');

class EmailService extends CrudService {
    constructor() {
        super(new TicketRepository());
        this.ticketRepository = new TicketRepository();
    }

    static async sendMail({ from, html, subject, text, to }) {
        const response = await sendMail({ from, html, subject, text, to });
        return response;
    }
    
    async createTicket(data) {
        const response = await this.ticketRepository.create({ data });
        return response;
    }

    async getPendingTickets() {
        const response = await this.getPendingTickets();
        return response;
    }
}

module.exports = EmailService;
