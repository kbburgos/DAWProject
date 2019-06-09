const express = require('express');
const router = express.Router();

const choferController = require('../controller/login.js');
//router.get('/', choferController.new);
router.get('/', choferController.login);
//router.get('/login/:ced&:pass', choferController.login);
module.exports = router;
