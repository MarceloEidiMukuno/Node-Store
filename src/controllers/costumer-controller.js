'use strict'

const mongoose = require('mongoose');
const Costumer = mongoose.model('Costumer');
const ValidationContract = require("../Validators/fluent-validator");
const repository = require("../repositories/costumer-repository");
const md5 = require('md5');
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

    let contract = new ValidationContract();

    contract.hasMinLen(req.body.Name, 3, 'O nome deve conter pelo menos 3 caracteres.');
    contract.hasMinLen(req.body.password, 3, 'O password deve conter pelo menos 3 caracteres.');
    contract.isEmail(req.body.email, 'O e-mail é invalido.');

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    repository
        .Create({
            Name: req.body.Name,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY),
            roles: ["user"]
        })
        .then(x => {
            res.status(201).send({ message: 'Costumer cadastrado com sucesso!' });
        })
        .catch(e => {
            res.status(400).send({ message: 'Falha ao cadastrar o costumer !', data: e });
        });
};

exports.postAsync = async (req, res, next) => {

    let contract = new ValidationContract();

    contract.hasMinLen(req.body.Name, 3, 'O nome deve conter pelo menos 3 caracteres.');
    contract.hasMinLen(req.body.password, 3, 'O password deve conter pelo menos 3 caracteres.');
    contract.isEmail(req.body.email, 'O e-mail é invalido.');

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        await repository.CreateAsync({
            Name: req.body.Name,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY),
            roles: ["user"]
        });
        return res.status(201).send({ message: 'Costumer cadastrado com sucesso!' });
    } catch (e) {

        res.status(400).send({ message: 'Falha ao cadastrar o costumer !', data: e });
    }
};

exports.authenticate = async (req, res, next) => {
    try {
        const customer = await repository.Authenticate({
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });

        if (!customer) {
            res.status(404).send({
                message: 'Usuário ou senha inválidos'
            });
            return;
        }

        const token = await authService.generateToken({
            id: customer.id,
            email: customer.email,
            name: customer.name,
            roles: customer.roles
        });

        res.status(201).send({
            token: token,
            data: {
                email: customer.email,
                name: customer.name
            }
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};

exports.refreshtoken = async (req, res, next) => {
    try {
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        var data = await authService.decodeToken(token);
        const customer = await repository.getbyid(data.id);
        if (!customer) {
            res.status(404).send({
                message: 'Cliente não cadastrado'
            });
            return;
        }

        const tokenData = await authService.generateToken({
            id: customer.id,
            email: customer.email,
            name: customer.name,
            roles: customer.roles
        });

        res.status(201).send({
            token: tokenData,
            data: {
                email: customer.email,
                name: customer.name
            }
        });
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
};