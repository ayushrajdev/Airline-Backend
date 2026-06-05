const db = require('../models');
const CrudRepository = require('./crud.repository');

class AirportRepository extends CrudRepository {
    constructor() {
        super(db.Airport);
    }
}

module.exports = AirportRepository;