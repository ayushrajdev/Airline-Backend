const BookingRepository = require("../repositories/booking.repository");
const CrudService = require("./crud.service");

class BookingService extends CrudService {
    constructor(parameters) {
        super(new BookingRepository)
    }
}

module.exports = BookingService