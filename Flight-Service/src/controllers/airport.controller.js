const AirportService = require("../services/airport.service");
const CrudController = require("./crud.controller");


class AirplaneController extends CrudController {
    constructor() {
        super(new AirportService());
    }
}

module.exports = AirplaneController;
