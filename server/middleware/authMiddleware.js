require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Admin = require('../models/admin');

module.exports = {
    authMiddleware: async({req}) => {
        const token = req.headers.authorization;
        console.log('token', token);
        if(!token) {
            return req;
        }
        const onlyToken = token.split(' ')[1];
        console.log('onlyToken', onlyToken);
        const result = jwt.verify(onlyToken, process.env.JWT_SECRET_KEY);
        console.log('result', result);
        req.user = result;
        return req;
    }
};