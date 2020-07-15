var express = require('express');
var router = express.Router();

var controller = require('../controller/login.controller');

router.post('/', controller.login);

module.exports = router;