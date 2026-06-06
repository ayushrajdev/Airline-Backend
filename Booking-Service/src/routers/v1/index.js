const { Router } = require('express');
const airplaneRouter = require('./airplane.router');
const cityRouter = require('./city.router');
const airportRouter = require('./airport.router');

const v1Router = Router();

v1Router.use('/airplanes', airplaneRouter);
v1Router.use('/cities', cityRouter);
v1Router.use('/airports', airportRouter);

module.exports = v1Router;
