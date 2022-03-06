'use strict'

const mongoose = require('mongoose');
const Costumer = mongoose.model('Costumer');

exports.get = () => {
    return Costumer
        .find({}, 'Name email');
}

exports.getAsync = async () => {
    const res = await Costumer
        .find({}, 'Name email');
    return res;
}

exports.Create = (data) => {
    var costumer = new Costumer(data);

    return costumer
        .save();
}

exports.CreateAsync = async (data) => {
    var costumer = new Costumer(data);
    await costumer.save();
}

exports.Authenticate = async (data) => {
    const res = await Costumer.findOne({
        email: data.email,
        password: data.password
    });
    return res;
}

exports.getbyid = async (id) => {
    const res = await Costumer.findById(id);
    return res;
}