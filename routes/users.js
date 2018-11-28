'use strict';

const express = require('express');
const router = express.Router();

let userController = require('../controllers/user');
let validator = require('../validators/user');

/* GET User details */
router.get('/:id', validator.get, userController.get);

/* POST User sign up */
router.post('/', validator.signUp, userController.signUp);

/* POST User login */
router.post('/login/', validator.login, userController.login);



module.exports = router;
