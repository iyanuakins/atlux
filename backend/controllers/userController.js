const Models = require('../models/Models');

//to add cars to cart when placing order
exports.addToCart = (req, res) => {
    Models.Carts.find({carId: req.body.carId, username: req.body.username })
        .then((carts) => {
            if (carts.length) {
                return res.status(200).json({success: true, status: 'old'})
            } else {
                Models.Cars.findById(req.body.carId)
                .then((car) => {
                    let newCart = new Models.Carts(req.body);
                    newCart.carPrice = car.pricePerKM;
                    newCart.save()
                    .then((cart) => {
                        return res.status(200).json({success: true, status: 'new'})
                    }).catch((err) => {
                        console.log(err);
                        return res.status(200).json({success: false})
                    });
                    
                }).catch((err) => {
                    console.log(err);
                    return res.status(200).json({success: false}) 
                });
            }
        })
        .catch((err) => {
            console.log(err);
            return res.status(200).json({success: false})
        });
    
    
 }

 //To add review for order
exports.addReview = (req, res) => {
    let newReview = new Models.Reviews(req.body);
    newReview.save()
        .then(() => {
            return res.status(200).json({success: true})
        }).catch((err) => {
            console.log(err);
            return res.status(200).json({success: false})
        });
    
 }

 //Fectch cars by brand for display on order page
exports.getCarByBrand = (req, res) => {
    Models.Cars.find({brand: req.params.brand })
        .then((cars) => {
            res.status(200).json(cars);
        })
        .catch((err) => {
            console.log(err);
            return res.status(200).json({error: err})
        });
}

//Fectch cars by types for display on order page
exports.getCarByType = (req, res) => {
    Models.Cars.find({type: req.params.type })
        .then((cars) => {
            res.status(200).json(cars);
        })
        .catch((err) => {
            console.log(err);
            return res.status(200).json({error: err})
        });
}

//Remove Cart Item
exports.removeItem = (req, res) => {
    Models.Carts.findByIdAndDelete(req.params.cartId)
        .then((cartItem) => {
            res.status(200).json({"success": true, "removedItem": cartItem});
        })
        .catch((err) => {
            console.log(err);
            res.status(200).json({"success": false})
        });
}

exports.getCarTypes = (req, res) => {
    Models.CarTypes.findOne({})
        .then((result) => {
            let types = result.cartype;
            res.status(200).json(types);
        })
        .catch((err) => {
            console.log(err);
            return res.status(200).json({error: err})
        });
}

exports.getCarBrands = (req, res) => {
    Models.Brands.findOne({})
        .then((result) => {
            let brands = result.brand;
            res.status(200).json(brands);
        })
        .catch((err) => {
            console.log(err);
            return res.status(200).json({error: err})
        });
}

exports.getCar = (req, res) => {
    Models.Cars.find({})
        .then((cars) => {
            res.status(200).json(cars);
        }).catch((err) => {
            console.log(err);
            return res.status(200).json({error: err})
        });
}

exports.viewCar = (req, res) => {
    Models.Cars.findById(req.params.carId)
        .then((car) => {
            Models.Reviews.find({carId: req.params.carId})
            .then((reviews) => {
                res.status(200).json([car, reviews]);
            })
            .catch((err) => {
                console.log(err);
                return res.status(200).json({error: err})
            });
        })
        .catch((err) => {
            console.log(err);
            return res.status(200).json({error: err})
        });
}

exports.getUserCart = (req, res) => {
    Models.Carts.find({username: req.params.user})
        .then((items) => { 
            if (!items.length) { 
                return res.status(200).json({"success": false});
            } else { 
                let newItems = [];
                return Promise.all(items.map((item, index) => {
                    Models.Cars.findById(item.carId)
                    .then((car) => {
                        
                        if ((items.length - 1) == index) {
                            let data = {
                                cartId: item._id,
                                carId: car._id,
                                carBrand: car.brand,
                                carModel: car.model,
                                carPrice: car.pricePerKM,
                                carImage: car.image,
                                carColour: car.colour
                            }
                            newItems.push(data);

                        return res.status(200).json({"success": true, "cart": newItems});
                        } else {
                            let data = {
                                cartId: item._id,
                                carId: car._id,
                                carBrand: car.brand,
                                carModel: car.model,
                                carPrice: car.pricePerKM,
                                carImage: car.image,
                                carColour: car.colour
                            }
                            newItems.push(data);
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        return res.status(200).json({error: err})
                    });
                }))
            }
        })
        .catch((err) => {
            console.log(err);
            return res.status(200).json({error: err})
        });
}

exports.countCart = (req, res) => {
    Models.Carts.find({username: req.params.user})
        .then((carts) => {
            res.status(200).json({count: carts.length});
        })
        .catch((err) => {
            console.log(err);
            return res.status(200).json({success: false})
        });
}

//To add order into order collection.
exports.addOrder = (req, res) => {
    Models.Carts.find({username: req.body.username})
        .then((cartItems) => {
            Promise.all (cartItems.map((item, index) => {
                //Destructure request body
                let {
                    pickUpDate,
                    pickUpTime,
                    location,
                    destination,
                    KM,
                    username
                  } = req.body
                
                if ((cartItems.length - 1) == index) {
                    //Model new order data
                    let data = { 
                        pickUpDate,
                        pickUpTime,
                        location,
                        destination,
                        totalCost: parseInt(item.carPrice) * parseInt(KM),
                        username,
                        carId: item.carId
                    }
                    let newOrder = new Models.Orders(data);
                    newOrder.save()
                        .then(() => {
                            Models.Carts.findByIdAndDelete(item._id)
                                .then((removed) => {
                                    return res.status(200).json({success: true})
                                })
                                .catch((err) => {
                                    console.log(err);
                                    return res.status(200).json({success: false})
                                });
                        }).catch((err) => {
                            console.log(err);
                            return res.status(200).json({success: false})
                        }); 
                } else {
                    //Model new order data
                    let data = { 
                        pickUpDate,
                        pickUpTime,
                        location,
                        destination,
                        totalCost: parseInt(item.carPrice) * parseInt(KM),
                        username,
                        carId: item.carId
                    }
                    let newOrder = new Models.Orders(data);
                    newOrder.save()
                        .then(() => {
                            Models.Carts.findByIdAndDelete(item._id)
                                .then((removed) => {
                                })
                                .catch((err) => {
                                    console.log(err);
                                    return res.status(200).json({success: false})
                                });
                        }).catch((err) => {
                            console.log(err);
                            return res.status(200).json({success: false})
                        }); 
                }
                
            }))
        }).catch((err) => {
            console.log(err);
            return res.status(200).json({success: false})
        });
 }

 exports.getOrders = (req, res) => {
    Models.Orders.find({username: req.params.user})
        .then((result) => {
            if (result.length) {
                res.status(200).json({"success": true, "available": true, "orders": result})
            } else {
                res.status(200).json({"success": true, "available": false})
            }
        }).catch((err) => {
            console.log(err);
            return res.status(200).json({success: false})
        });
 }

 //To transfer cart items from local storage to DB
exports.transferCartItems = (req, res) => { 
    let cartItems = req.body[1];
    if (cartItems.length > 1) {
        cartItems.map((cartItem, index) => {
            if ((cartItems.length - 1) === index) {
                cartItem.username = req.body[0];
                let newCartItem = new Models.Carts(cartItem);
                newCartItem.save()
                .then(() => {
                    return res.status(200).json({success: true})
                }).catch((err) => {
                    console.log(err);
                    return res.status(200).json({success: false})
                });
            } else {
                cartItem.username = req.body[0];
                let newCartItem = new Models.Carts(cartItem);
                newCartItem.save()
            }
        });
    }
    
    
    
 }