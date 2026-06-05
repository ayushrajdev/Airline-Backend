const { Router } = require('express');
const AirplaneController = require('../../controllers/airplane.controller');

const router = Router();

const airplaneController = new AirplaneController();

router
    .route('/')
    .post(airplaneController.create)
    .get(airplaneController.getAll);
router
    .route('/:id')
    .get(airplaneController.get)
    .delete(airplaneController.delete)
    .patch(airplaneController.update)

module.exports = router;
