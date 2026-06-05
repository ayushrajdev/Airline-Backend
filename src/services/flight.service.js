const { Op } = require('sequelize');
const BadRequestError = require('../errors/BadRequestError');
const FlightRepository = require('../repositories/flight.repository');
const CrudService = require('./crud.service');

class FlightService extends CrudService {
    constructor() {
        super(new FlightRepository());
    }

        try {
            const flights = await this.repository.getAll({
                filter: customFilter,
                sort: sortFilter,
            });
            return flights;
        } catch (error) {
            throw error;
        }
    };
}

module.exports = FlightService;
