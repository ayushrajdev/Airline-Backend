const express = require('express');
const BookingController = require('../../controllers/booking.controller');
const router = express.Router();

const bookingController = new BookingController();

router.route('/').get(bookingController.get).post(bookingController.create);

module.exports = router;
