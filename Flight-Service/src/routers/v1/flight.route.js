const { Router } = require('express');
const FlightController = require('../../controllers/flight.controller');

const router = Router();

const flightController = new FlightController();

router.route('/').post(filter,flightController.create).get(flightController.getAll);
router.route('/:id').get(flightController.get).delete(flightController.delete);

module.exports = router;
