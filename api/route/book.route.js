var express = require('express');
var router = express.Router();

const controller = require('../controller/book.controller')

router.post('/create', controller.postCreate);

router.get('/', controller.index);

// router.post('/:id/delete', controller.delete);

module.exports = router;