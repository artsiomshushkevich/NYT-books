var express = require('express');
var bodyParser = require('body-parser');
var config = require('./config/config');
var userRouter = require('./controllers/user.router.js');
var validator = require('express-validator');
var constants = require('./utils/constants');
var userService = require('./services/user.service');
var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use(validator({
    customValidators: {
        isUsernameBusy: function(usernameArg) {
            return new Promise(function(resolve, reject) {
                userService.findOne({username: usernameArg})
                    .then(function(doc) {
                        if (doc) {
                            reject();
                        } else {
                            resolve();
                        }
                    });
            });
        }
    }
}));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

app.use('/api/user', userRouter);

app.use(function(err, req, res, next) {
    res.status(500).send({message: constants.errorMessages.INTERNAL_SERVER_ERROR});
});

app.listen(config.port, function() {
    console.log('Server has started!');
});

