const express = require('express');
const router = express.Router();
const admin = require('../controllers/admin');
const user = require('../controllers/user');


//Admin Car Management Routes
router.post('/addcar', admin.addCar);
router.get('/removecar/:carId', admin.removeCar);
router.post('/addcarbrand', admin.addCarBrand);
router.post('/removecarbrand', admin.removeCarBrand);
router.post('/addcartype', admin.addCarType);
router.post('/removecartype', admin.removeCarType);
router.get('/getallcars', admin.getAllCars);
router.get('/getthiscar/:carId', admin.getThisCar);
router.get('/getcarcount', admin.getCarsCount);


//Admin driver management Routes
router.post('/adddriver', admin.addDriver);
router.post('/suspenddriver', admin.suspendDriver);
router.get('/getalldrivers', admin.getAllDrivers);
router.get('/getdrivercount', admin.getDriversCount);


//Admin Order Routes
router.get('/getallorders', admin.getAllOrders);
router.get('/getlastorders', admin.getLastOrders);
router.get('/getpendingorders', admin.getPendingOrders);
router.post('/approveorder', admin.approveOrder);
router.post('/completeorder', admin.completeOrder);


//Admin user management Routes
router.get('/getthisuser/:id', admin.getThisUser);
router.get('/getallusers', admin.getAllUsers);
router.get('/getlastusers', admin.getLastUsers);
router.get('/getusercount', admin.getUsersCount);

module.exports = router;