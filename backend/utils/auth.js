const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');
require('dotenv').config();


const verifyToken = (token) => {
    try {
        const { email } = jwt.verify(token, process.env.JWT_SECRET);
        return { email, token };
    } catch (e) {
        throw new AuthenticationError(
            'Authentication token is invalid, please log in',
        );
    }
}

const createToken = (email, password) => {
    try {
        // here you will add actual database call to validate username/password
        const token = jwt.sign({ email: email, password: password }, process.env.JWT_SECRET);
        return { token, email }
    } catch (e) {
        throw new AuthenticationError(
            'Authentication token is invalid, please log in',
        )
    }
}

module.exports = { verifyToken, createToken }