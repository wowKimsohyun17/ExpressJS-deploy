var express = require('express');
var router = express.Router();

const controller = require('../controller/user.controller')

router.get('/', controller.index);

module.exports = router;