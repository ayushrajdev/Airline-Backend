const AirplaneController = require('./airplane.controller');
const CityController = require('./city.controller');

const controllers = {
    airplane: new AirplaneController(),
    city: new CityController(),
};

module.exports = controllers;
