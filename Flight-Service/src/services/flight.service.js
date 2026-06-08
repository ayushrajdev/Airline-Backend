const { Op } = require('sequelize');
const BadRequestError = require('../errors/BadRequestError');
const FlightRepository = require('../repositories/flight.repository');
const CrudService = require('./crud.service');

class FlightService extends CrudService {
    constructor() {
        super(new FlightRepository());
        this.flightRepository = new FlightRepository();
    }

    getAll = async (query) => {
        let customFilter = {};
        let sortFilter = [];
        const endingTripTime = ' 23:59:00';
        // trips=MUM-DEL
        if (query.trips) {
            [departureAirportId, arrivalAirportId] = query.trips.split('-');
            customFilter.departureAirportId = departureAirportId;
            customFilter.arrivalAirportId = arrivalAirportId;
            // TODO: add a check that they are not same
            if (departureAirportId == arrivalAirportId) {
                throw new BadRequestError(
                    'trip for same destination',
                    'please check the trip destination and source',
                );
            }
        }
        if (query.price) {
            [minPrice, maxPrice] = query.price.split('-');
            customFilter.price = {
                [Op.between]: [
                    minPrice,
                    maxPrice == undefined ? 20000 : maxPrice,
                ],
            };
        }
        if (query.travellers) {
            customFilter.totalSeats = {
                [Op.gte]: query.travellers,
            };
        }
        if (query.tripDate) {
            customFilter.departureTime = {
                [Op.between]: [query.tripDate, query.tripDate + endingTripTime],
            };
        }
        if (query.sort) {
            const params = query.sort.split(',');
            const sortFilters = params.map((param) => param.split('_'));
            sortFilter = sortFilters;
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

    async updateRemainingSeats({ flighId, seats, dec }) {
        try {
            const response = await this.flightRepository.updateRemainingSeats({
                flighId,
                seats,
                dec,
            });
            return response;
        } catch (error) {
            console.log(error);
            throw new AppError(
                'Cannot update data of the flight',
                StatusCodes.INTERNAL_SERVER_ERROR,
            );
        }
    }
}

module.exports = FlightService;
