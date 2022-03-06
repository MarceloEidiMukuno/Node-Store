'use strict'

const mongoose = require('mongoose');
const Order = mongoose.model('Orders');

exports.get = () => {
    return Order
        .find({}, 'number status')
        .populate('costumer', 'Name email')
        .populate('itens.product', 'title');
}

exports.getAsync = async () => {
    const res = await Order
        .find({}, 'number status')
        .populate('costumer', 'Name email')
        .populate('itens.product', 'title');
    return res;
}

exports.Create = (data) => {
    var order = new Order(data);

    return order
        .save();
}

exports.CreateAsync = async (data) => {
    var order = new Order(data);
    await order.save();
}