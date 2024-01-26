const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth')

const Order = require('../models/order');
const Product = require('../models/product');
const controllerOrders = require('../controllers/orders');

router.get('/', checkAuth, controllerOrders.get_all_orders);
router.post('/', checkAuth, controllerOrders.create_order);
router.get('/:orderId', checkAuth, controllerOrders.get_order_by_id);
router.delete('/:orderId', checkAuth, controllerOrders.delete_order);

module.exports = router;