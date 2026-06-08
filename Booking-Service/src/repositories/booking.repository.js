const CrudRepository = require('./crud.repository');
const db = require('../models/index');
class BookingRepository extends CrudRepository {
    constructor(parameters) {
        super(db.Booking);
        this.Booking = db.Booking
    }

    async create({data, transaction}) {
        const response = await this.Booking.create(data, {transaction: transaction});
        return response;
    } 
}

module.exports = BookingRepository;
