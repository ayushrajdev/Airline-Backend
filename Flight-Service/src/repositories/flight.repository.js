const db = require('../models');
const CrudRepository = require('./crud.repository');
const { Airplane, Airport } = require('../models');

class FlightRepository extends CrudRepository {
    constructor() {
        super(db.Flight);
        this.Flight = db.Flight;
    }

    getAll = async ({ filter, sort }) => {
        const flights = await this.Flight.findAll({
            where: filter,
            order: sort,
            inclue: [
                {
                    model: Airplane,
                    required: true,
                    as: 'airplane_details',
                },
                {
                    model: Airport,
                    required: true,
                    as: 'departureAirport',
                    on: {
                        col1: Sequelize.where(
                            Sequelize.col('Flight.departureAirportId'),
                            '=',
                            Sequelize.col('departureAirport.code'),
                        ),
                    },
                    include: {
                        model: City,
                        required: true,
                    },
                },
                {
                    model: Airport,
                    required: true,
                    as: 'arrivalAirport',
                    on: {
                        col1: Sequelize.where(
                            Sequelize.col('Flight.arrivalAirportId'),
                            '=',
                            Sequelize.col('arrivalAirport.code'),
                        ),
                    },
                    include: {
                        model: City,
                        required: true,
                    },
                },
            ],
        });
        return flights;
    };
}

module.exports = FlightRepository;
