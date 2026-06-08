const { Router } = require('express');
const { filterRequestBody } = require('../../middlewares/flight.middleware');

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

module.exports = router;
