function BaseMongoService(collection) {
    this.collection = collection;
}

BaseMongoService.prototype.create = function(query) {
    var newModel = new this.collection(query);

    return newModel.save();
};

BaseMongoService.prototype.findOne = function(query) {
    return this.collection.findOne(query);
};

module.exports = BaseMongoService;