const AirplaneService = require('../services/airplane.service');
const CrudController = require('./crud.controller');

class AirplaneController extends CrudController {
    constructor() {
        super(new AirplaneService());
    }
}

module.exports = AirplaneController;
