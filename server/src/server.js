var express = require('express');
var bodyParser = require('body-parser');
var config = require('./config/config');
var userRouter = require('./routers/user.router.js');
var validator = require('express-validator');
var constants = require('./utils/constants');
var expressJWT = require('express-jwt');

var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use(validator());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

app.use(expressJWT({secret: config.secretKey}).unless({path: [
    '/api/user/login',
    '/api/user/register'
]}));

app.use('/api/user', userRouter);

app.use(function(err, req, res, next) {
    if (err.status === 401) {
        res.status(401).send([{msg: constants.errorMessages.NOT_AUTHORIZED}]);
    } else {
        res.status(500).send([{msg: constants.errorMessages.INTERNAL_SERVER_ERROR}]);
    }
});

app.listen(config.port, function() {
    console.log('Server has started!');
});

