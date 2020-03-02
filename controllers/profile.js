const { Users } = require('../models/Models');
const encrypt = require('bcrypt');

exports.profileEdit = (req, res) => {
    const query = {username: req.body.username};
    Users.findOneAndUpdate(query, {$set: {"details.firstName": req.body.firstName, "details.lastName": req.body.lastName, "details.address": req.body.address,"details.userType": req.body.phNum}}, {new: true})
        .then((newData) => {
            if(newData){
                res.status(200).json({success: true, userData: newData});
            } else {
                res.status(200).json({success: false});
            }
    })
    .catch((err) => res.status(200).json({success: false}))
}

exports.passwordEdit = (req, res) => {
    const query = {username: req.body.username};
    Users.findOne(query).then((result) => {
        if (result) {
            encrypt.compare(req.body.oldPassword, result.password, (err, match) => {
                if (match) {
                    encrypt.hash(req.body.password, 12, (err, hash) => {
                        if (err) {
                            return res.status(200).json({success: false});
                        } else {
                            Users.findOneAndUpdate(query, {$set: {"password": hash}})
                            .then(() => res.status(200).json({success: true}))
                            .catch((err) => res.status(200).json({success: false}))
                        }
                    })
                } else {
                    return res.status(200).json({success: false});
                }
            })
    
        }
    })
    .catch((err) => res.status(200).json({success: false}))
}

exports.profileView = (req, res) => {
    Users.find({username: req.params.username })
        .then((userData) => {
            res.status(200).json(userData);
        })
        .catch((err) => req.json({error: err}));
}