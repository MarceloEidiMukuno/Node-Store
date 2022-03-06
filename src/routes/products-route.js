'use strict'

const express = require('express'); // Importação para utilizar o MVC Model
const router = express.Router(); // Rotas
const controller = require('../controllers/product-controller');
const authService = require('../services/auth-services');

router.get('/', controller.get);
router.get('/:slug', controller.getSlug);
router.get('/tags/:tag', controller.getTags);
router.get('/admin/:id', controller.getId);

router.get('/async', controller.getAsync);
router.get('/async/:slug', controller.getSlugAsync);
router.get('/async/tags/:tag', controller.getTagsAsync);
router.get('/async/admin/:id', controller.getIdAsync);

router.post('/', authService.isAdmin, controller.post);
router.put('/:id', authService.isAdmin, controller.put);
router.delete('/', authService.isAdmin, controller.delete);

router.post('/async', authService.isAdmin, controller.postAsync);
router.put('/async/:id', authService.isAdmin, controller.putAsync);
router.delete('/async', authService.isAdmin, controller.deleteAsync);


module.exports = router;