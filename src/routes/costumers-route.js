'use strict'

const express = require('express'); // Importação para utilizar o MVC Model
const router = express.Router(); // Rotas
const controller = require('../controllers/costumer-controller');
const authService = require('../services/auth-services');

router.post('/', controller.post);
router.get('/', controller.get);
router.post('/async', controller.postAsync);
router.get('/async', controller.getAsync);
router.post('/authenticate', controller.authenticate);
router.post('/refresh-token', authService.authorize, controller.refreshtoken);

module.exports = router;