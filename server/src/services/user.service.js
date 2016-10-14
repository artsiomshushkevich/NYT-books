var mongo = require('../utils/mongo');
var userSchema = require('./../schemas/user.schema.js');

module.exports = mongo.service('user', userSchema);