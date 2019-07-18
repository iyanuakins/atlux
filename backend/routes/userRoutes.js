const express = require('express');
const router = express.Router();
const profile = require('../controllers/profileController');
const admin = require('../controllers/adminController');
const user = require('../controllers/userController');

//Genaral User Routes
router.get('/profile/view/:username', profile.profileView);
router.post('/profile/edit', profile.profileEdit);
router.post('/profile/password', profile.passwordEdit);
router.post('/review/add', user.addReview);

//Car Routes
router.get('/car', user.getCar);
router.get('/carbrand/:brand', user.getCarByBrand);
router.get('/cartype/:type', user.getCarByType);
router.get('/viewcar/:carId', user.viewCar);
router.get('/car/getcarbrands', user.getCarBrands);
router.get('/car/getcartypes', user.getCarTypes);

//Cart Routes
router.post('/cart/add', user.addToCart);
router.get('/cart/count/:user', user.countCart);
router.get('/cart/getusercart/:user', user.getUserCart);
router.get('/cart/removeitem/:cartId', user.removeItem);

//Admin Routes
router.post('/admin/addcar', admin.addCar);
router.post('/admin/addcarbrand', admin.addCarBrand);
router.post('/admin/addcartype', admin.addCarType);
//router.post('/admin/add', admin.addSample);


module.exports = router;