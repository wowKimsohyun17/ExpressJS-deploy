var express = require('express');
var router = express.Router();

const controller = require('../controller/transaction.controller');

router.get('/', controller.index);

router.get('/create', controller.create);

module.exports = router;