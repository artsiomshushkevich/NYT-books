var express = require('express');
var userService = require('../services/user.service.js');
var constants = require('../utils/constants');
var userValidator = require('../validators/user.validator');
var jwt = require('jsonwebtoken');
var config = require('../config/config');
var bcrypt = require('bcrypt');

var router = express.Router();

function favoritesIndexOf(favoritesArray, isbn) {
    var index = -1;

    for(var i = 0; i < favoritesArray.length; i++) {
        if (favoritesArray[i].isbn === isbn) {
            index = i;
            return index;
        }
    }

    return index;
}

router.post('/register', function(req, res) {
    var errors = userValidator.validateDuringRegister(req);

    if (errors) {
        res.status(400).send(errors);
        return;
    }

    userService.exists({username: req.body.username})
        .then(function(isBusy) {
            if (isBusy) {
                res.status(400).send([{msg: constants.errorMessages.BUSY_USERNAME}]);
            } else {
                var newUser = {
                    username: req.body.username
                };

                bcrypt.hash(req.body.password, config.saltRounds, function(err, hash) {
                    newUser.password = hash;

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
});

router.post('/login', function(req, res) {
    var errors = userValidator.validateDuringLogin(req);

    if (errors) {
        res.status(400).send(errors);
        return;
    }

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

});

router.put('/update', function(req, res) {
   userService.findOne({
       username: req.body.oldUsername
   }).then(function(user) {
       if (user) {
           bcrypt.compare(req.body.oldPassword, user.password, function(err, result) {
               if (result) {
                   var errors = userValidator.validateDuringUpdate(req);

                   if (errors) {
                       res.status(400).send(errors);
                       return;
                   }

                   userService.exists({
                       username: req.body.newUsername
                   }).then(function(isBusy) {
                       if (isBusy && user.username !== req.body.newUsername) {
                           res.status(400).send([{msg: constants.errorMessages.BUSY_USERNAME}]);
                           return;
                       }

                       user.username =  req.body.newUsername;

                       bcrypt.hash(req.body.newPassword, config.saltRounds, function(err, hash) {
                           user.password = hash;

                           userService.update(user)
                               .then(function() {
                                   var jwtToken = jwt.sign({username: req.body.newUsername}, config.secretKey);

                                   res.status(200).send({
                                       token: jwtToken,
                                       username: req.body.newUsername
                                   });
                               });
                       });
                   });
               } else {
                   res.status(400).send([{msg: constants.errorMessages.INVALID_CREDENTIALS}]);
               }

           });
       } else {
           res.status(400).send([{msg: constants.errorMessages.INVALID_CREDENTIALS}]);
       }
   });
});

router.post('/favorites/add-one', function(req, res) {
    userService.findOne({
        username: req.body.username
    }).then(function(user) {
        var newFavorite = {
            isbn: req.body.isbn,
            listname: req.body.listname
        };

        if (favoritesIndexOf(user.favorites, newFavorite.isbn) !== -1) {
            res.status(400).send([{msg: constants.errorMessages.EXISTS_IN_FAVORITES}]);
            return;
        }

        user.favorites.push(newFavorite);

        userService.update(user)
            .then(function() {
                res.sendStatus(200);
            });
    });
});


router.put('/favorites/delete-all',function(req, res) {
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

router.put('/favorites/delete-one', function(req, res) {
    userService.findOne({
        username: req.body.username
    }).then(function(user) {
        var deletedIsbn =  req.body.isbn;

        var indexOfDeletedIsbn = favoritesIndexOf(user.favorites, deletedIsbn);

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