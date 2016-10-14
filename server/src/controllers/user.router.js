var express = require('express');
var userService = require('../services/user.service.js');
var constants = require('../utils/constants');
var userValidationSchema = require('../validation-schemas/user.schema');

var router = express.Router();

router.post('/create', function(req, res) {
    req.checkBody(userValidationSchema);

    var errors = req.validationErrors();

    if (errors) {
        res.status(400).send(errors);
    } else {
        req.check('username', constants.errorMessages.BUSY_USERNAME).isUsernameBusy(req.body.username);

        req.asyncValidationErrors()
            .then(function() {
                userService.create(req.body)
                    .then(function() {
                        res.sendStatus(200);
                    });
            })
            .catch(function(err) {
                res.status(400).send({message: err[0].msg})
            });
    }
});

router.put('/update/:id', function(req, res) {

});

module.exports = router;