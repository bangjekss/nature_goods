const express = require('express');
const { test, login, register, deleteAccount, getAll } = require('../controllers/userControllers');

const route = express.Router();

route.get('/', getAll);
route.get('/test', test);
route.get('/:id', login);
route.post('/register', register);
route.delete('/:id', deleteAccount);

module.exports = route;
