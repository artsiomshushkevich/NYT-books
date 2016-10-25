function BaseMongoService(collection) {
    this.collection = collection;
}

BaseMongoService.prototype.create = function(query) {
    var newModel = new this.collection(query);

    return newModel.save();
};

BaseMongoService.prototype.exists = function(query) {
    return this.collection.find(query)
        .then(function(doc) {
            return doc.length !== 0;
        });
};

BaseMongoService.prototype.findOne = function(query) {
    return this.collection.findOne(query);
};

BaseMongoService.prototype.update = function(collection) {
    return collection.save();
}

module.exports = BaseMongoService;