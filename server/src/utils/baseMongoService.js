function BaseMongoService(collection) {
    this.collection = collection;
}

BaseMongoService.prototype.create = function(query) {
    var newModel = new this.collection(query);

    return newModel.save()
        .then(function(data) {
            if (data) {
                return data;
            }

            return null;
        }, function (error) {
            console.log(error);
        });
};

module.exports = BaseMongoService