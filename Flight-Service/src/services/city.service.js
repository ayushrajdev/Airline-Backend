const CityRepository = require('../repositories/city.repository');
const CrudService = require('./crud.service');

class CityService extends CrudService {
    constructor() {
        super(new CityRepository());
    }
}

module.exports = CityService;
