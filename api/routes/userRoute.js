const express = require('express');
const { register } = require('../controllers/userControllers');
const { registerValidator } = require('../middlewares');

const route = express.Router();

route.post('/register', registerValidator, register);

module.exports = route;
