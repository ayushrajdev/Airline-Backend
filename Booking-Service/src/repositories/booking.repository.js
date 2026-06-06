const CrudRepository = require("./crud.repository");
const db = require("../models/index")
class BookingRepository extends CrudRepository {
    constructor(parameters) {
        super(db.Booking)
    }
}

module.exports = BookingRepository