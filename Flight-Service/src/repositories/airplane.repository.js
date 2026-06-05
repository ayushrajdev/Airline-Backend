const db = require('../models');
const CrudRepository = require('./crud.repository');

class AirplaneRepository extends CrudRepository {
    constructor() {
        super(db.Airplane);
    }
}

module.exports = AirplaneRepository;