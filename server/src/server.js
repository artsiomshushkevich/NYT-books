var express = require('express');
var bodyParser = require('body-parser');
var config = require('./config/config');
var userRouter = require('./routers/user.router');

var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

app.use('/api/user', userRouter);

app.listen(config.port, function() {
    console.log('Server has started!');
});

