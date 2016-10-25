var constants = require('../utils/constants');

module.exports = {
    'username': {
        matches: {
            options:[constants.regularExpressions.USERNAME],
        },
        errorMessage: constants.errorMessages.INVALID_USERNAME
    },
    'password': {
        matches: {
            options:[constants.regularExpressions.PASSWORD]
        },
        errorMessage: constants.errorMessages.INVALID_PASSWORD
    },
    'firstname': {
        optional: true,
        matches: {
            options:[constants.regularExpressions.PART_OF_FULLNAME]
        },
        errorMessage: constants.errorMessages.INVALID_PART_OF_FULLNAME
    },
    'lastname': {
        optional: true,
        matches: {
            options:[constants.regularExpressions.PART_OF_FULLNAME]
        },
        errorMessage: constants.errorMessages.INVALID_PART_OF_FULLNAME
    }
}