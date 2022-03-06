'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema({
    costumer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Costumer',
        required: true
    },
    number: {
        type: String,
        required: true
    },
    createDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    status: {
        type: String,
        required: true,
        enum: ['created', 'done'],
        default: 'created'
    },
    itens: [{
        quantidade: {
            type: Number,
            required: true,
            defaut: 1
        },
        price: {
            type: Number,
            requierd: true
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        }
    }]
});

module.exports = mongoose.model('Orders', schema);
