const { Router } = require('express');
const CityController = require('../../controllers/city.controller');
const { filterRequestBody } = require('../../middlewares/flight.middleware');
// const { city: cityController } = require('../../controllers');

const router = Router();

const cityController = new CityController();

router
    .route('/')
    .post(filterRequestBody, cityController.create)
    .get(cityController.getAll);
router.route('/:id').get(cityController.get).delete(cityController.delete);

module.exports = router;
