const db = require('../models');
const CrudRepository = require('./crud.repository');

class CityRepository extends CrudRepository {
    constructor() {
        super(db.City);
    }
}

module.exports = CityRepository;