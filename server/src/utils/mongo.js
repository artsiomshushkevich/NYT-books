var mongoose = require('mongoose');
var BaseMongoService = require('./../services/base-mongo.service');
var config = require('../config/config');

function Mongo(mongo) {
    this.mongo = mongo;
    this.mongo.Promise = global.Promise;
    this.db = this.mongo.connection;

    this.registerEvents();

    this.mongo.connect(config.mongo);
}

Mongo.prototype.registerEvents = function() {
    this.db.on('connected', function () {
        console.log('Mongo connection is opened to ' + config.mongo);
    });

    this.db.on('error', function (err) {
        console.log('Mongoose default connection error: ' + err);
    });

    this.db.on('disconnected', function () {
        console.log('Mongoose disconnected');
    });
};

Mongo.prototype.service = function(model, schema) {
    var collection = this.mongo.model(model, schema);

    return new BaseMongoService(collection);
}


module.exports = new Mongo(mongoose);
