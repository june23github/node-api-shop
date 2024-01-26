const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');

const checkAuth = require('../middleware/check-auth')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/');
    },
    filename: function(req, file, cb){
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + file.originalname);
    }
});

const fileFilter = (req, file, cb) =>{
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    }else{
        cb(null, false);
    }
}

const upload = multer({
    storage: storage, 
    limits:{
        fileSize: 5*1024*1024
    },
    fileFilter: fileFilter
});

const Product = require('../models/product');
const controllerProducts = require('../controllers/products');

router.get('/', checkAuth, controllerProducts.get_all_products);

router.post('/', checkAuth, upload.single('productImage'), controllerProducts.create_product);
router.get('/:productId', checkAuth, controllerProducts.get_product_by_id);
router.patch('/:productId', checkAuth, controllerProducts.update_product);
router.delete('/:productId', checkAuth, controllerProducts.delete_product);
module.exports = router;