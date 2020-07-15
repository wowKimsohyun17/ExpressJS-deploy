var express = require('express');
var router = express.Router();

var controller = require('../controller/book.controller');

var multer = require('multer');
var upload = multer({ dest: './public/uploads/'});

router.get('/', controller.index);

router.get('/create', controller.create);

router.post('/create', controller.postCreate);

router.get('/:id/delete', controller.delete);

router.get('/:id/edit', controller.edit);

router.get('/:id/update', controller.update);

router.post('/update', upload.single('coverUrl'), controller.postUpdate);

router.post('/:id/edit', controller.postEdit);

module.exports = router;