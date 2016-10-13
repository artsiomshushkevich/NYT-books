var express = require('express');
var userService = require('../resources/user/user.service');

var router = express.Router();

router.get('/:id', function(req, res) {
});

router.post('/create', function(req, res) {
    var newUser = req.body;

    userService.create(newUser)
        .then(function(data) {
            res.sendStatus(200);
        });
});

router.put('/update/:id', function(req, res) {

});

module.exports = router;