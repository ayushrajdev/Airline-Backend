const CrudRepository = require('./crud.repository');
const db = require('../models/index');
const CrudRepository = require('./crud-repository');

class TicketRepository extends CrudRepository {
    constructor() {
        super(db.Ticket);
    }

    async getPendingTickets() {
        const response = await db.Ticket.findAll({
            where: {
                status: 'PENDING',
            },
        });
        return response;
    }
}

module.exports = TicketRepository;
