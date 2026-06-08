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

    async updateRemainingSeats(req, res) {
        try {
            console.log(req.body);
            const response = await this.flightService.updateRemainingSeats({
                flighId: req.params.id,
                seats: req.body.seats,
                dec: req.body.dec,
            });
            return res.status(StatusCodes.OK).json(response);
        } catch (error) {
            ErrorResponse.error = error;
            return res.status(error.statusCode).json(ErrorResponse);
        }
    }
}

module.exports = FlightController;
