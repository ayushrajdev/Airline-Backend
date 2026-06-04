const { Router } = require('express');
const CityController = require('../../controllers/city.controller');
// const { city: cityController } = require('../../controllers');

const router = Router();

const cityController = new CityController();

router.route('/').post(cityController.create).get(cityController.getAll);
router.route('/:id').get(cityController.get).delete(cityController.delete);

module.exports = router;
