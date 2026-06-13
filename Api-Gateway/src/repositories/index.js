const AirplaneRepository = require('./airplane.repository');
const CityRepository = require('./city.repository');

const repositories = {
    airplane: new AirplaneRepository(),
    city: new CityRepository(),
};

module.exports = repositories;
