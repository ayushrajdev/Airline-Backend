const CrudRepository = require('../repositories/crud.repository');
const BookingService = require('../services/booking.service');

class BookingController extends CrudRepository {
    constructor() {
        super(new BookingService)
    }
}


module.exports = BookingController