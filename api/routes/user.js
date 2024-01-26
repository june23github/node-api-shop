const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const controllerUser = require('../controllers/users');

router.post('/login', controllerUser.log_in);

router.post('/signup', controllerUser.sign_up);

router.delete('/:userId', controllerUser.delete_user);



module.exports = router;
