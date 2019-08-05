const express = require('express');
const router = express.Router();
const profile = require('../controllers/profile');
const user = require('../controllers/user');

//Genaral User Routes
router.get('/validateusers', user.validateUsers);
router.get('/getrank/:user', user.getUserRank);
router.post('/review/add', user.addReview);

//User profile Routes
router.get('/profile/view/:username', profile.profileView);
router.post('/profile/edit', profile.profileEdit);
router.post('/profile/password', profile.passwordEdit);

//Order routes
router.get('/order/getorders/:user', user.getOrders);
router.get('/order/getlastorders/:user', user.getLastOrders);

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
router.post('/cart/payment', user.addOrder);
router.post('/cart/transfer', user.transferCartItems);


module.exports = router;