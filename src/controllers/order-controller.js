'use strict'

const repository = require("../repositories/order-repository");
const guid = require('guid');
const authService = require('../services/auth-services');

exports.get = (req, res, next) => {
    repository
        .get()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(e => {
            res.status(400).send(e);
        })
};

exports.getAsync = async (req, res, next) => {
    try {
        var data = await repository.getAsync();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({ message: 'Falha ao processar a solicitacao' });
    }
};

exports.post = (req, res, next) => {

    repository
        .Create({
            costumer: req.body.costumer,
            number: guid.raw().substring(0, 6),
            itens: req.body.itens
        })
        .then(x => {
            res.status(201).send({ message: 'Order cadastrado com sucesso!' });
        })
        .catch(e => {
            res.status(400).send({ message: 'Falha ao cadastrar o order !', data: e });
        });
};

exports.postAsync = async (req, res, next) => {

    try {

        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        var data = await authService.decodeToken(token);

        await repository.CreateAsync({
            costumer: data.id,
            number: guid.raw().substring(0, 6),
            itens: req.body.itens
        });
        return res.status(201).send({ message: 'Order cadastrado com sucesso!' });
    } catch (e) {

        res.status(400).send({ message: 'Falha ao cadastrar o order !', data: e });
    }
};
