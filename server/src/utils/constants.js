module.exports = {
    errorMessages: {
        INTERNAL_SERVER_ERROR: 'Something bad happened!',
        NOT_AUTHORIZED: 'Not authorized!',
        NOT_SAME_PASSWORDS: 'Password and confirm password fields have different values!',
        INVALID_CREDENTIALS: 'Invalid credentials! Please verify your credentials.',
        BUSY_USERNAME: 'This username is busy!',
        INVALID_USERNAME: 'Invalid username! Should have length between 3 and 16 characters.',
        INVALID_PASSWORD: 'Invalid password! Should have length between 8 and 16 characters and contain at least 1 upper-case character and 1 number.',
        EXISTS_IN_FAVORITES: 'This book exists in favorites!'
    },
    regularExpressions: {
        PASSWORD: '^(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,16}$',
        USERNAME: '^[a-zA-Z0-9]{3,16}$'
    },

};