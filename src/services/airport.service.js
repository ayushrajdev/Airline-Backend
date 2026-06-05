const CrudService = require('./crud.service');
const AirportRepository = require('../repositories/airport.repository.js');

class AirportService extends CrudService {
    constructor() {
        super(new AirportRepository());
    }
}

module.exports = AirportService;
