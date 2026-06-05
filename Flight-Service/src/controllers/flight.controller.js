const FlightService = require('../services/flight.service');
const successResponse = require('../utils/response');
const CrudController = require('./crud.controller');

class FlightController extends CrudController {
    constructor() {
        super(new FlightService());
        this.flightService = new FlightService();
    }

    getAll = async (req, res, next) => {
        try {
            const flights = this.flightService.getAll(req.query);
            return successResponse(res, {
                data: flights,
                message: 'flights of provided filter',
            });
        } catch (error) {}
    };
}

module.exports = FlightController;
