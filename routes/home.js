const express = require('express');
const router = express.Router();
const user = require('../controllers/user');

//Car Routes
router.get('/car', user.getCar);
router.get('/carbrand/:brand', user.getCarByBrand);
router.get('/cartype/:type', user.getCarByType);
router.get('/viewcar/:carId', user.viewCar);
router.get('/car/getcarbrands', user.getCarBrands);
router.get('/car/getcartypes', user.getCarTypes);
router.get('/car/getrandom', user.getRandomCars);

//Cart Routes
router.post('/cart/add', user.addToCart);
router.get('/cart/count/:user', user.countCart);



module.exports = router;