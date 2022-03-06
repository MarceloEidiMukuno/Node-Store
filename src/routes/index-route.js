'use strict'

const express = require('express'); // Importação para utilizar o MVC Model

const router = express.Router(); // Rotas

router.get('/', (req, res, next) => {
    res.status(200).send();
});

module.exports = router;