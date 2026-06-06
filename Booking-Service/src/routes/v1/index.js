const { Router } = require('express');
const bookingRouter = require('./booking.route.js');


const v1Router = Router();

v1Router.use('/bookings', bookingRouter);

module.exports = v1Router;
