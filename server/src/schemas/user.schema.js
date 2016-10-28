var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    favorites: [{
        isbn: String,
        listname: String
    }]
});