const express = require('express');
const BookingController = require('../../controllers/booking.controller');
const {
    validateBookingCreationRequest,
} = require('../../middlewares/booking.middleware');
const router = express.Router();

const bookingController = new BookingController();

router
    .route('/')
    .get(bookingController.get)
    .post(validateBookingCreationRequest, bookingController.create);

module.exports = router;
