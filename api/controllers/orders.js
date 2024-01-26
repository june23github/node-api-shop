const Order = require('../models/order');
const Product = require('../models/product');
const mongoose = require('mongoose');

exports.get_all_orders = (req, res, next) =>{
    Order
        .find()
        .select('_id product quantity')
        .populate('product', 'name')
        .exec()
        .then(docs =>{
            res.status(200).json({
                count: docs.length,
                orders: docs.map(doc => {
                    return {
                        _id: doc._id,
                        product: doc.product,
                        quantity:doc.quantity,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/orders/' + doc._id
                        }
                    }
                })
                
            })
        })
        .catch(err =>{
            res.status(500).json({
                error: err
            })
        })
}

exports.create_order = (req, res, next) =>{
    Product.findById(req.body.productId)
        .exec()
        .then()
        .catch(err => {
            res.status(500).json({
                message: 'Product not found',
                error: err
            })
        })
    const order = new Order({
        _id : new mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId
    });
    order
        .save()
        .then(result =>{
            res.status(201).json({
                message: 'Order stored',
                createdOrder: {
                    _id: result._id,
                    product: result.product,
                    quantity: result.quantity
                },
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/orders/' + result._id
                }
            })
        })
        .catch(err =>{
            res.status(500).json({
                error: err
            })
        })
    
}

exports.get_order_by_id = (req, res, next) =>{
    const id = req.params.orderId;
    Order.findById(id)
        .exec()
        .then(result =>{
            res.status(200).json({
                order: result,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/orders' + id
                }
            })
        })
        .catch(err =>{
            res.status(500).json({
                error: err
            })
        })
}

exports.delete_order = (req, res, next) =>{
    const id = req.params.orderId;
    Order.deleteOne({_id: id})
        .exec()
        .then(result =>{
            res.status(200).json({
                message: 'deleted order',
                request: {
                    type: 'POST'
                }
            })
        })
        .catch()
}