const { Cars, Carts, Brands, Orders, CarTypes, Reviews, Users } = require('../models/Models');

//to add cars to cart when placing order
exports.addToCart = (req, res) => {
    Carts.find({carId: req.body.carId, username: req.body.username })
        .then((carts) => {
            if (carts.length) {
                return res.status(200).json({success: true, status: 'old'})
            } else {
                Cars.findById(req.body.carId)
                .then((car) => {
                    let newCart = new Carts(req.body);
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
    let newReview = new Reviews(req.body);
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
    Cars.find({brand: req.params.brand })
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
    Cars.find({type: req.params.type })
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
    Carts.findByIdAndDelete(req.params.cartId)
        .then((cartItem) => {
            res.status(200).json({"success": true, "removedItem": cartItem});
        })
        .catch((err) => {
            console.log(err);
            res.status(200).json({"success": false})
        });
}

exports.getCarTypes = (req, res) => {
    CarTypes.findOne({})
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
    Brands.findOne({})
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
    Cars.find({})
        .then((cars) => {
            res.status(200).json(cars);
        }).catch((err) => {
            console.log(err);
            return res.status(200).json({error: err})
        });
}

exports.viewCar = (req, res) => {
    Cars.findById(req.params.carId)
        .then((car) => {
            Reviews.find({carId: req.params.carId})
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
    Carts.find({username: req.params.user})
        .then((items) => { 
            if (!items.length) { 
                return res.status(200).json({"success": false});
            } else { 
                let newItems = [];
                return Promise.all(items.map((item, index) => {
                    Cars.findById(item.carId)
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
    Carts.find({username: req.params.user})
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
    Carts.find({username: req.body.username})
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
                    let newOrder = new Orders(data);
                    newOrder.save()
                        .then(() => {
                            Carts.findByIdAndDelete(item._id)
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
                    let newOrder = new Orders(data);
                    newOrder.save()
                        .then(() => {
                            Carts.findByIdAndDelete(item._id)
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

 //get user orders
 exports.getOrders = (req, res) => {
    Orders.find({username: req.params.user})
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

 //get user last 5 orders
 exports.getLastOrders = (req, res) => {
    Orders.find({username: req.params.user}).sort({ _id: -1 }).limit(5)
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

    //get user auth details
 exports.getUserRank = (req, res) => {
    Users.findOne({username: req.params.user})
        .then((result) => {
            let {level, userType} = result;
                res.status(200).json({"rank": level, "userType": userType});
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
                let newCartItem = new Carts(cartItem);
                newCartItem.save()
                .then(() => {
                    return res.status(200).json({success: true})
                }).catch((err) => {
                    console.log(err);
                    return res.status(200).json({success: false})
                });
            } else {
                cartItem.username = req.body[0];
                let newCartItem = new Carts(cartItem);
                newCartItem.save()
            }
        });
    }
}

//Getting random cars for homepage
exports.getRandomCars = (req, res) => {
    Cars.aggregate([{$sample: {size: 3}}])
        .then((cars) => {
            return res.status(200).json({"success": true, "cars": cars})
        }).catch((err) => {
            console.log(err);
            return res.status(200).json({"success": false})
        });
}

exports.validateUsers = (req, res) => {
    return res.status(200).json({"status": true});
}