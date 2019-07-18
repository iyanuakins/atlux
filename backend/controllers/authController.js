const Models = require('../models/Models');
const encrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secKey = "03SecretKey04";


exports.register = (req, res) => {
   let newUser = new Models.Users(req.body);
   
   Models.Users.findOne({email: newUser.email}).then((result) => {
       if (result) {
         return res.status(200).json({error: 'email'});
       } else {
                Models.Users.findOne({username: newUser.username}).then((result) => {
                    if (result) {
                        return res.status(200).json({error: 'username'});
                    } else {
                            encrypt.hash(newUser.password, 12, (err, hash) => {
                                if (err) {
                                return res.status(200).json({error: 'Fail to Hash'});
                                } else {
                                    newUser.password = hash;
                                    newUser.save()
                                    .then(() => {
                                        let payload = {subject: newUser._id};
                                        let token = jwt.sign(payload, secKey);
                                        return res.status(200).json({ message: "Successfully Registered", token: token, user: newUser.username });
                                    })
                                    .catch(err => res.status(200).json({error: 'saving failed'}));
                                } 
                                
                            });
                    }
                }); 
       }
   });

   
   
}

exports.login = (req, res) => {
    
    let userLogin = new Models.Users(req.body);
    Models.Users.findOne({username: userLogin.username}).then((result) => {
        if (result) {
            encrypt.compare(userLogin.password, result.password, (err, match) => {
            if (match) {
                let payload = {subject: result._id};
                let token = jwt.sign(payload, secKey);
                res.status(200).json({ message: "Authenticated", token: token, user: userLogin.username });
            } else
                return res.status(200).json({error: 'failed'});
            });
        } else {
           return res.status(200).json({ error: 'failed' });
        }
    });
}

exports.checkEmail = (req, res) => {
    Models.Users.findOne({email: req.body.email}).then((result) => {
        if(result){
            res.status(200).json({status : true});
        } else {
            res.status(200).json({status : false});
        }
    });
}

exports.checkUsername = (req, res) => {
    Models.Users.findOne({username: req.body.username}).then((result) => {
        if(result){
            res.status(200).json({status : true});
        } else {
            res.status(200).json({status : false});
        }
    });
}