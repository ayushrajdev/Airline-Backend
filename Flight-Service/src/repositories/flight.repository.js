const db = require('../models');
const CrudRepository = require('./crud.repository');
const { Airplane, Airport } = require('../models');
const { Flight, Airplane, Airport, City } = require('../models');
const { addRowLockOnFlights } = require('./queries');

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

    async updateRemainingSeats({ flightId, seats, dec = true }) {
        const transaction = await db.sequelize.transaction();
        try {
            await db.sequelize.query(addRowLockOnFlights(flightId));
            const flight = await Flight.findByPk(flightId);
            if (+dec) {
                await flight.decrement(
                    'totalSeats',
                    { by: seats },
                    { transaction: transaction },
                );
            } else {
                await flight.increment(
                    'totalSeats',
                    { by: seats },
                    { transaction: transaction },
                );
            }
            await transaction.commit();
            return flight;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
}

module.exports = FlightRepository;
