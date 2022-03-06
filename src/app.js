'use strict'

const express = require('express'); // Importação para utilizar o MVC Model
const bodyParser = require('body-parser'); // Importação para utilizar converter o body pra JSon
const mongoose = require('mongoose');
const config = require('./config');

// Criando a aplicação
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Habilita o CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

// Conex]ao com o BD
mongoose.connect(config.connectionString);

// Carrega os Models
const Product = require('./models/product');
const Costumer = require('./models/costumer');
const Order = require('./models/orders');

//Configurando a rota
const indexRoute = require('./routes/index-route');
const productRoute = require('./routes/products-route');
const costumerRoute = require('./routes/costumers-route');
const orderRoute = require('./routes/order-route');

// Definindo a porta da aplicação
app.use('/', indexRoute);
app.use('/products', productRoute);
app.use('/costumers', costumerRoute);
app.use('/order', orderRoute);


module.exports = app;