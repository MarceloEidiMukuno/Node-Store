'use strict'

const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const ValidationContract = require("../Validators/fluent-validator");
const repository = require("../repositories/product-repository");

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

exports.getSlug = (req, res, next) => {
    repository
        .getSlug(req.params.slug)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(e => {
            res.status(400).send(e);
        })
};

exports.getSlugAsync = async (req, res, next) => {
    try {
        const data = await repository.getSlugAsync(req.params.slug);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({ message: 'Falha ao processar a solicitacao' });
    }
};


exports.getId = (req, res, next) => {
    repository
        .getId(req.params.id)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(e => {
            res.status(400).send(e);
        })
};

exports.getIdAsync = async (req, res, next) => {
    try {
        const data = await repository.getIdAsync(req.params.id);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({ message: 'Falha ao processar a solicitacao' });
    }
};

exports.getTags = (req, res, next) => {
    repository
        .getTags(req.params.tag)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(e => {
            res.status(400).send(e);
        })
};

exports.getTagsAsync = async (req, res, next) => {
    try {
        const data = await repository.getTagsAsync(req.params.tag);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({ message: 'Falha ao processar a solicitacao' });
    }
};

exports.post = (req, res, next) => {

    let contract = new ValidationContract();

    contract.hasMinLen(req.body.title, 3, 'O titulo deve conter pelo menos 3 caracteres.');
    contract.hasMinLen(req.body.slug, 3, 'O slug deve conter pelo menos 3 caracteres.');
    contract.hasMinLen(req.body.description, 3, 'O description deve conter pelo menos 3 caracteres.');

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    repository
        .Create(req.body)
        .then(x => {
            res.status(201).send({ message: 'Produto cadastrado com sucesso!' });
        })
        .catch(e => {
            res.status(400).send({ message: 'Falha ao cadastrar o produto !', data: e });
        });
};

exports.postAsync = async (req, res, next) => {

    let contract = new ValidationContract();

    contract.hasMinLen(req.body.title, 3, 'O titulo deve conter pelo menos 3 caracteres.');
    contract.hasMinLen(req.body.slug, 3, 'O slug deve conter pelo menos 3 caracteres.');
    contract.hasMinLen(req.body.description, 3, 'O description deve conter pelo menos 3 caracteres.');

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }
    try {
        await repository.CreateAsync(req.body);
        return res.status(201).send({ message: 'Produto cadastrado com sucesso!' });
    } catch (e) {

        res.status(400).send({ message: 'Falha ao cadastrar o produto !', data: e });
    }

};

exports.put = (req, res, next) => {
    repository
        .Update(req.params.id, req.body)
        .then(x => {
            res.status(200).send({ message: 'Produto atualizado com sucesso!' });
        })
        .catch(e => {
            res.status(400).send({ message: 'Falha ao atualizar o produto !', data: e });
        });
};


exports.putAsync = async (req, res, next) => {
    try {
        await repository
            .Update(req.params.id, req.body);

        res.status(200).send({ message: 'Produto atualizado com sucesso!' });

    } catch (e) {

        res.status(400).send({ message: 'Falha ao atualizar o produto !', data: e });
    }
};

exports.delete = (req, res, next) => {
    repository
        .Delete(req.body.id)
        .then(x => {
            res.status(200).send({ message: 'Produto excluido com sucesso!' });
        })
        .catch(e => {
            res.status(400).send({ message: 'Falha ao excluir o produto !', data: e });
        });
};

exports.deleteAsync = async (req, res, next) => {
    try {
        await repository.DeleteAsync(req.body.id);
        res.status(200).send({ message: 'Produto excluido com sucesso!' });

    } catch (e) {
        res.status(400).send({ message: 'Falha ao excluir o produto !', data: e });
    }
};