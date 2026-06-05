const CityService = require('../services/city.service');
const CrudController = require('./crud.controller');

class CityController extends CrudController {
    constructor() {
        super(new CityService());
    }

}

module.exports = CityController;
