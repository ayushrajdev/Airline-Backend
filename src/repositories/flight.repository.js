const db = require('../models');
const CrudRepository = require('./crud.repository');

class FlightRepository extends CrudRepository {
    constructor() {
        super(db.Flight);
        this.Flight = db.Flight;
    }

    getAll = async ({ filter, sort }) => {
        const flights = await this.Flight.findAll({
            where: filter,
            order: sort,
        }); 
    };
}

module.exports = FlightRepository;
