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
                    res.status(400).send([{msg: constants.errorMessages.BUSY_USERNAME}]);
                } else {
                    var newUser = {
                        username: req.body.username,
                        firstname: req.body.firstname,
                        lastname: req.body.lastname
                    };

                    bcrypt.hash(req.body.password, config.saltRounds, function(err, hash) {
                        newUser.password = hash;

                        // if (req.body.firstname) {
                        //     newUser.firstname = req.body.firstname;
                        // }
                        //
                        // if (req.body.lastname) {
                        //     newUser.lastname = req.body.lastname;
                        // }

                        userService.create(newUser)
                            .then(function() {
                                var jwtToken = jwt.sign({username: req.body.username}, config.secretKey);

                                res.status(200).send({
                                    token: jwtToken,
                                    username: req.body.username
                                });
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

                        res.status(200).send({
                            token: jwtToken,
                            username: req.body.username
                        });
                    } else {
                        res.status(400).send([{msg: constants.errorMessages.INVALID_CREDENTIALS}]);
                    }
                });
            } else {
                res.status(400).send([{msg: constants.errorMessages.INVALID_CREDENTIALS}]);
            }
        });
    }
});

router.post('/favorites/add-one', function(req, res) {
    userService.findOne({
        username: req.body.username
    }).then(function(user) {
        var favorites = user.favorites;
        var newFavorite = {
            isbn: req.body.isbn,
            listname: req.body.listname
        };

        req.checkBody('isbn', constants.errorMessages.INVALID_ISBN).matches(constants.regularExpressions.ISBN);

        var errors = req.validationErrors();

        if (errors) {
            res.status(400).send(errors);
            return;
        }

        if (favorites.indexOf(newFavorite) !== -1) {
            res.status(400).send([{msg: constants.errorMessages.EXISTS_IN_FAVORITES}]);
            return;
        }

        favorites.push(newFavorite);

        userService.update(user)
            .then(function() {
                res.sendStatus(200);
            });
    });
});


router.delete('/favorites/delete-all',function(req, res) {
    userService.findOne({
        username: req.body.username
    }).then(function(user) {
        user.favorites = [];

        userService.update(user)
            .then(function() {
                res.sendStatus(200);
            });
    });
});

router.delete('/favorites/delete-one', function(req, res) {
    userService.findOne({
        username: req.body.username
    }).then(function(user) {
        var favorites = user.favorites;
        var deletedIsbn =   req.body.isbn;

        var indexOfDeletedIsbn = favorites.indexOf(deletedIsbn);

        user.favorites.splice(indexOfDeletedIsbn, 1);

        userService.update(user)
            .then(function() {
                res.sendStatus(200);
            });
    });
});


router.get('/favorites/get-all/:username', function(req, res) {
    userService.findOne({
        username: req.params.username
    }).then(function(user) {
        res.status(200).send(user.favorites);
    });
});

module.exports = router;