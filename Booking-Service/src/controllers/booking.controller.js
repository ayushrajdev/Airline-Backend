const CrudController = require('../../../Flight-Service/src/controllers/crud.controller');
const BookingService = require('../services/booking.service');

class BookingController extends CrudController {
    constructor() {
        super(new BookingService)
        
    }
}


module.exports = BookingController