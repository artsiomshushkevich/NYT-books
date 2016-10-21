var express = require('express');
var userService = require('../services/user.service.js');
var constants = require('../utils/constants');
var userValidationSchema = require('../validation-schemas/user.schema');
var jwt = require('jsonwebtoken');
var config = require('../config/config');
var bcrypt = require('bcrypt');

var router = express.Router();

router.post('/register', function(req, res) {
    req.checkBody(userValidationSchema);

    req.checkBody('password', constants.errorMessages.NOT_SAME_PASSWORDS).equals(req.body.confirmPassword);

    var errors = req.validationErrors();

    if (errors) {
        res.status(400).send(errors);
    } else {
        userService.exists({username: req.body.username})
            .then(function(isBusy) {
                if (isBusy) {
                    res.status(400).send({message: constants.errorMessages.BUSY_USERNAME});
                } else {
                    var newUser = {
                        username: req.body.username
                    };

                    bcrypt.hash(req.body.password, config.saltRounds, function(err, hash) {
                        newUser.password = hash;

                        if (req.body.firstname) {
                            newUser.firstname = req.body.firstname;
                        }

                        if (req.body.lastname) {
                            newUser.lastname = req.body.lastname;
                        }

                        userService.create(newUser)
                            .then(function() {
                                var jwtToken = jwt.sign({username: req.body.username}, config.secretKey);

                                res.status(200).send({token: jwtToken});
                            });
                    });
                }
            });

    }
});

router.post('/login', function(req, res) {
    req.checkBody(userValidationSchema);

    var errors = req.validationErrors();

    if (errors) {
        res.status(400).send(errors);
    } else {
        userService.findOne({
            username: req.body.username
        }).then(function(user) {
            if (user) {
                bcrypt.compare(req.body.password, user.password, function (err, result) {
                    if (result) {
                        var jwtToken = jwt.sign({username: req.body.username}, config.secretKey);

                        res.status(200).send({token: jwtToken});
                    } else {
                        res.status(400).send({message: constants.errorMessages.INVALID_CREDENTIALS});
                    }
                });
            } else {
                res.status(400).send({message: constants.errorMessages.INVALID_CREDENTIALS});
            }
        });
    }
});

module.exports = router;