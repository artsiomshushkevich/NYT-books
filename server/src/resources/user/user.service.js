var mongo = require('../../utils/mongo');
var userSchema = require('./user.schema');

module.exports = mongo.service('user', userSchema);