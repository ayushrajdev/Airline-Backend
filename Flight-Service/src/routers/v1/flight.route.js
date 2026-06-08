const { Router } = require('express');
const { filterRequestBody } = require('../../middlewares/flight.middleware');
const FlightController = require('../../controllers/flight.controller');

const router = Router();

const flightController = new FlightController();

router
    .route('/')
    .post(filterRequestBody, flightController.create)
    .get(flightController.getAll);

router
    .route('/:id')
    .get(flightController.get)
    .delete(flightController.delete)
    .patch(flightController.update);

router.route('/:id/seats').patch(flightController.updateRemainingSeats);

module.exports = router;
