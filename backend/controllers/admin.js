const Models = require('../models/Models');

exports.addCar = (req, res) => {
    let newCar = new Models.Cars(req.body);
    newCar.save()
        .then((car) => {
            return res.status(200).json({success: true})
        }).catch((err) => {
            console.log(err);
            return res.status(200).json({success: false});
        });
    
 }

/*exports.addSample = (req, res) => {
    let newSample = new Models.CarTypes(req.body);
    newSample.save()
        .then((car) => {
            return res.status(200).json({success: true})
        }).catch((err) => {
            console.log(err);
            return res.status(200).json({success: false, err: err});
        });
    
 }

exports.addSample = (req, res) => {
    let newSample = new Models.Brands(req.body);
    newSample.save()
        .then((car) => {
            return res.status(200).json({success: true})
        }).catch((err) => {
            console.log(err);
            return res.status(200).json({success: false, err: err});
        });
    
}*/

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
            }).catch((err) => {
                console.log(err);
                res.status(200).json({success: false});
            })

    }).catch((err) => {
        console.log(err);
        return res.status(200).json({success: false});
    });
}


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
            }).catch((err) => {
                console.log(err);
                res.status(200).json({success: false});
            })

    }).catch((err) => {
        console.log(err);
        return res.status(200).json({success: false});
    });
}