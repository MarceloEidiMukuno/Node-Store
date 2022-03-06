'use strict'

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = () => {
    return Product
        .find({
            active: true
        },
            'description slug price');
}

exports.getAsync = async () => {
    const res = await Product
        .find({
            active: true
        },
            'description slug price');
    return res;
}

exports.getSlug = (slug) => {
    return Product
        .findOne({
            slug: slug,
            active: true
        },
            'title description slug price tags');
}

exports.getSlugAsync = async (slug) => {
    const res = await Product
        .findOne({
            slug: slug,
            active: true
        },
            'title description slug price tags');
    return res;
}

exports.getId = (id) => {
    return Product
        .findById(id);
}

exports.getIdAsync = async (id) => {
    const res = await Product
        .findById(id);
    return res;
}

exports.getTags = (tag) => {
    return Product
        .find({
            tags: tag
        },
            'title description slug price tags');
}


exports.getTagsAsync = async (tag) => {
    const res = await Product
        .find({
            tags: tag
        },
            'title description slug price tags');
    return res;
}


exports.Create = (data) => {
    var product = new Product(data);

    return product
        .save();
}

exports.CreateAsync = async (data) => {
    var product = new Product(data);
    await product.save();
}

exports.Update = (id, data) => {
    return Product
        .findByIdAndUpdate(
            id,
            {
                $set:
                {
                    title: data.title,
                    description: data.description,
                    slug: data.slug,
                    price: data.price
                }
            });
}


exports.UpdateAsync = async (id, data) => {
    await Product
        .findByIdAndUpdate(
            id,
            {
                $set:
                {
                    title: data.title,
                    description: data.description,
                    slug: data.slug,
                    price: data.price
                }
            });
}

exports.Delete = (id) => {
    return Product
        .findOneAndRemove(id);
}

exports.DeleteAsync = async (id) => {
    await Product
        .findOneAndRemove(id);
}