'use strict'

const express = require('express'); // Importação para utilizar o MVC Model
const router = express.Router(); // Rotas
const controller = require('../controllers/order-controller');
const authService = require('../services/auth-services');

router.post('/', authService.authorize, controller.post);
router.get('/', controller.get);
router.post('/async', authService.authorize, controller.postAsync);
router.get('/async', controller.getAsync);

module.exports = router;