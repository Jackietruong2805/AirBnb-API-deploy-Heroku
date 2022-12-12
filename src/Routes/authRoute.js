const express = require('express');
const authRoute = express.Router();
const {signUp, signIn} = require('../Controllers/authController');

authRoute.post('/auth/signup', signUp);
authRoute.post('/auth/signin', signIn);

module.exports = authRoute;