const encrypt = require('bcrypt');
const Models = require('../models/Models');

//Add a Car
exports.addCar = (req, res) => {
    let newCar = new Models.Cars(req.body);
    newCar.save()
        .then((car) => {
            return res.status(200).json({success: true})
        })
        .catch((err) => {
            console.log(err);
            return res.status(200).json({success: false});
        });
 }

 //Remove Car
exports.removeCar = (req, res) => {
    Models.Cars.findByIdAndDelete(req.params.carId)
        .then((car) => {
            res.status(200).json({"success": true, "removedCar": car});
        })
        .catch((err) => {
            console.log(err);
            res.status(200).json({"success": false})
        });
}


// exports.addCarType = (req, res) => {
//     let newSample = new Models.CarTypes(req.body);
//     newSample.save()
//         .then((car) => {
//             return res.status(200).json({success: true})
//         }).catch((err) => {
//             console.log(err);
//             return res.status(200).json({success: false, err: err});
//         });
//  }

//Add car Brand/Maker
exports.addCarBrand = (req, res, next) => {
    Models.Brands.findOne({})
        .then((result) => { 
            let newBrand = result.brand;
            newBrand.push(req.body.brand)
            Models.Brands.findOneAndUpdate({}, {$set: {"brand": newBrand}}, {new: true})
                .then((newData) => {
                    if(newData){
                        res.status(200).json({success: true});
                    } else {
                        res.status(200).json({success: false});
                    }
                })
                .catch((err) => {
                    console.log(err);
                    res.status(200).json({success: false});
                })

        })
        .catch((err) => {
            console.log(err);
            return res.status(200).json({success: false});
        });
}

//Remove Car Brand/Maker
    exports.removeCarBrand = (req, res) => {
    Models.Brands.findOne({})
        .then((result) => { 
            let newBrand = result.brand.filter((brand) => {
                return brand.name !== req.body.brand
            });
            Models.Brands.findOneAndUpdate({}, {$set: {"brand": newBrand}}, {new: true})
                .then((newData) => {
                    if(newData){
                        res.status(200).json({success: true});
                    } else {
                        res.status(200).json({success: false});
                    }
                })
                .catch((err) => {
                    console.log(err);
                    res.status(200).json({success: false});
                })

        })
        .catch((err) => {
            console.log(err);
            return res.status(200).json({success: false});
        });
}


//Add new Car Type
exports.addCarType = (req, res) => {
    Models.CarTypes.findOne({})
        .then((result) => {
            let newCarType = result.cartype;
            newCarType.push(req.body.cartype)

            Models.CarTypes.findOneAndUpdate({}, {$set: {"cartype": newCarType}}, {new: true})
                .then((newData) => {
                    if(newData){
                        res.status(200).json({success: true});
                    } else {
                        res.status(200).json({success: false});
                    }
                })
                .catch((err) => {
                    console.log(err);
                    res.status(200).json({success: false});
                })

        })
        .catch((err) => {
            console.log(err);
            return res.status(200).json({success: false});
        });
}

//Remove car type
exports.removeCarType = (req, res) => {
    Models.CarTypes.findOne({})
        .then((result) => {
            let newCarType = result.cartype.filter((cartype) => {
                return cartype.name !== req.body.cartype
            });

            Models.CarTypes.findOneAndUpdate({}, {$set: {"cartype": newCarType}}, {new: true})
                .then((newData) => {
                    if(newData){
                        res.status(200).json({success: true});
                    } else {
                        res.status(200).json({success: false});
                    }
                })
                .catch((err) => {
                    console.log(err);
                    res.status(200).json({success: false});
                })

        })
        .catch((err) => {
            console.log(err);
            return res.status(200).json({success: false});
        });
}


//get cars for management
exports.getAllCars = (req, res) => {
    Models.Cars.find({})
        .then((result) => {
            if (result.length) {
                res.status(200).json({"success": true, "available": true, "cars": result})
            } else {
                res.status(200).json({"success": true, "available": false})
            }
        })
        .catch((err) => {
            console.log(err);
            return res.status(200).json({success: false})
        });
}
 
//get a particular car for management
exports.getThisCar = (req, res) => {
    Models.Cars.findById(req.params.carId)
        .then((result) => {
            res.status(200).json({"success": true, "car": result})
        })
        .catch((err) => {
            console.log(err);
            return res.status(200).json({success: false})
        });
}

//get total cars count
exports.getCarsCount = (req, res) => {
    Models.Cars.find({})
        .then((result) => {
            if (result.length) {
                res.status(200).json({"success": true, "totalCars": result.length})
            } else {
                res.status(200).json({"success": true, "totalUsers": 0})
            }
        })
        .catch((err) => {
            console.log(err);
            return res.status(200).json({success: false})
        });
}

//Add new driver to the system
exports.addDriver = (req, res) => {
    let newDriver = new Models.Users(req.body);

    Models.Users.findOne({email: newDriver.email}).then((result) => {
        if (result) {
            return res.status(200).json({error: 'email'});
        } else {
                Models.Users.findOne({username: newDriver.username}).then((result) => {
                    if (result) {
                        return res.status(200).json({error: 'username'});
                    } else {
                        encrypt.hash(newDriver.password, 12, (err, hash) => {
                            if (err) {
                            return res.status(200).json({error: 'Fail to Hash'});
                            } else {
                                newDriver.password = hash;
                                newDriver.userType = 'driver'
                                newDriver.save()
                                .then(() => {
                                    return res.status(200).json({ message: "Driver Added Successfully"});
                                })
                                .catch((err) => {
                                    console.log(err);
                                    return res.status(200).json({error: 'saving failed'})
                                });
                            } 
                            
                        });
                    }
                }); 
        }
    }); 
}


//get drivers for management
exports.getAllDrivers = (req, res) => {
    Models.Users.find({userType: 'driver'})
        .then((result) => {
            if (result.length) {
                res.status(200).json({"success": true, "available": true, "drivers": result})
            } else {
                res.status(200).json({"success": true, "available": false})
            }
        })
        .catch((err) => {
            console.log(err);
            return res.status(200).json({success: false})
        });
}


//get total drivers count
exports.getDriversCount = (req, res) => {
    Models.Users.find({userType: 'driver'})
        .then((result) => {
            if (result.length) {
                res.status(200).json({"success": true, "totalDrivers": result.length})
            } else {
                res.status(200).json({"success": true, "totalUsers": 0})
            }
        })
        .catch((err) => {
            console.log(err);
            return res.status(200).json({success: false})
        });
}

//Suspend driver 
exports.suspendDriver = (req, res) => {
    Models.Users.findByIdAndUpdate(req.body.orderID, {level: 0})
        .then(() => {
            return res.status(200).json({success: true})
        })
        .catch((err) => {
            console.log(err);
            return res.status(200).json({success: false})
        });
}


//get last 5 orders
exports.getLastOrders = (req, res) => {
    Models.Orders.find({}).sort({ _id: -1 }).limit(5)
        .then((result) => {
            if (result.length) {
                res.status(200).json({"success": true, "available": true, "orders": result})
            } else {
                res.status(200).json({"success": true, "available": false})
            }
        })
        .catch((err) => {
            console.log(err);
            return res.status(200).json({success: false})
        });
}


//get user pending orders
exports.getPendingOrders = (req, res) => {
    Models.Orders.find({status: 'pending'})
        .then((result) => {
            if (result.length) {
                res.status(200).json({"success": true, "totalOrders": result.length})
            } else {
                res.status(200).json({"success": true, "totalOrders": 0})
            }
        })
        .catch((err) => {
            console.log(err);
            return res.status(200).json({success: false})
        });
}

//get user orders
exports.getAllOrders = (req, res) => {
    Models.Orders.find({})
        .then((result) => {
            if (result.length) {
                res.status(200).json({"success": true, "available": true, "orders": result})
            } else {
                res.status(200).json({"success": true, "available": false})
            }
        })
        .catch((err) => {
            console.log(err);
            return res.status(200).json({success: false})
        });
}


//Approve and attach driver to an order 
exports.approveOrder = (req, res) => {
    Models.Orders.findByIdAndUpdate(req.body.orderID, {driverId: req.body.driverID, status: 'processed'})
        .then(() => {
            return res.status(200).json({success: true})
        })
        .catch((err) => {
            console.log(err);
            return res.status(200).json({success: false})
        });
}


//Mark order as Complete
exports.completeOrder = (req, res) => {
    Models.Orders.findByIdAndUpdate(req.body.orderID, {status: 'completed'})
        .then(() => {
            return res.status(200).json({success: true})
        })
        .catch((err) => {
            console.log(err);
            return res.status(200).json({success: false})
        });
}


//get a particular users for management
exports.getThisUser = (req, res) => {
    Models.Users.findById(req.params.id)
        .then((result) => {
            res.status(200).json({"success": true, "user": result})
        })
        .catch((err) => {
            console.log(err);
            return res.status(200).json({success: false})
        });
}


 //get last 5 registered users
exports.getLastUsers = (req, res) => {
    Models.Users.find({userType: 'client'}).sort({ _id: -1 }).limit(5)
        .then((result) => {
            if (result.length) {
                res.status(200).json({"success": true, "available": true, "users": result})
            } else {
                res.status(200).json({"success": true, "available": false})
            }
        })
        .catch((err) => {
            console.log(err);
            return res.status(200).json({success: false})
        });
}


//get users for management
exports.getAllUsers = (req, res) => {
    Models.Users.find({userType: 'client'})
        .then((result) => {
            if (result.length) {
                res.status(200).json({"success": true, "available": true, "users": result})
            } else {
                res.status(200).json({"success": true, "available": false})
            }
        }).catch((err) => {
            console.log(err);
            return res.status(200).json({success: false})
        });
}


//get total users count
exports.getUsersCount = (req, res) => {
    Models.Users.find({userType: 'client'})
        .then((result) => {
            if (result.length) {
                res.status(200).json({"success": true, "totalUsers": result.length})
            } else {
                res.status(200).json({"success": true, "totalUsers": 0})
            }
        }).catch((err) => {
            console.log(err);
            return res.status(200).json({success: false})
        });
}