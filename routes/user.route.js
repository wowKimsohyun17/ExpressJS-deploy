var express = require('express');
var router = express.Router();

var controller = require('../controller/user.controller');
var validate = require('../middleware/users.validate');

var multer = require('multer');
var upload = multer({ dest: './public/uploads/'});

router.get('/', controller.index);

router.get('/search', controller.search);

router.get('/create', controller.create);

router.get('/profile', controller.profile);

router.get('/:id/view', controller.view);



router.post('/create', 
    upload.single('avatar'), 
    validate.postCreate, 
    controller.postCreate
);

router.post('/profile/avatar', upload.single('avatar'), controller.postAvatar);



module.exports = router;     