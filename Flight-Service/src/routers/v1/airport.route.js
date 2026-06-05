const { Router } = require('express');
const AirportController = require('../../controllers/airport.controller');

const router = Router();

const airportController = new AirportController();

// /api/v1/airports
router.route('/').post(airportController.create).get(airportController.getAll);

/*
   /api/v1/airports
*/
router
    .route('/:id')
    .get(airportController.get)
    .delete(airportController.delete)
    .patch(airportController.update);

module.exports = router;
