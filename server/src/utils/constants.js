module.exports = {
    errorMessages: {
        INTERNAL_SERVER_ERROR: 'Something bad happened!',
        BUSY_USERNAME: 'This username is busy!',
        INVALID_USERNAME: 'Invalid username! Should have length between 3 and 16 characters.',
        INVALID_PASSWORD: 'Invalid password! Should have length between 8 and 16 characters and contain at least 1 upper-case character and 1 number.',
        INVALID_PART_OF_FULLNAME: 'Invalid part of full name! Should have length 2-30 and contain only alphabetical characters.'
    },
    regularExpressions: {
        PASSWORD: '^(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,16}$',
        PART_OF_FULLNAME: '^[a-zA-Z]{2,30}$',
        USERNAME: '^[a-zA-Z0-9]{3,16}$'
    }
};