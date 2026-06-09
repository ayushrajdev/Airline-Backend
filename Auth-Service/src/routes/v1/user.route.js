const express = require('express');
const BookingController = require('../../controllers/booking.controller');
const router = express.Router();

const bookingController = new BookingController();



module.exports = router;
