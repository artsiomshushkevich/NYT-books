var constants = require('../utils/constants');

module.exports = {
    validateDuringLogin: function(req) {
        req.checkBody('username', constants.errorMessages.INVALID_USERNAME)
            .matches(constants.regularExpressions.USERNAME);

        req.checkBody('password', constants.errorMessages.INVALID_PASSWORD)
            .matches(constants.regularExpressions.PASSWORD);

        return req.validationErrors();
    },
    validateDuringRegister: function(req) {
        this.validateDuringLogin(req);

        req.checkBody('password', constants.errorMessages.NOT_SAME_PASSWORDS)
            .equals(req.body.confirmPassword);

        return req.validationErrors();
    },
    validateDuringUpdate: function(req) {
        req.checkBody('newUsername', constants.errorMessages.INVALID_USERNAME)
            .matches(constants.regularExpressions.USERNAME);

        req.checkBody('newPassword', constants.errorMessages.INVALID_PASSWORD)
            .matches(constants.regularExpressions.PASSWORD);

        req.checkBody('newPassword', constants.errorMessages.NOT_SAME_PASSWORDS)
            .equals(req.body.confirmPassword);

        return req.validationErrors();
    }
};