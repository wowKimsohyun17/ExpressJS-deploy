// var db = require('../db');
var User = require('../models/users.model');
// var shortId = require('shortid');

var cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
});

module.exports.index = function(req, res){
    User.find().then(function(users){
        res.render('./users/index', {
            users: users
        });
    });
    
};

module.exports.search = async function(req, res){
    var query = req.query.q;
    var users = await User.find();
    var matchUsers = users.filter(function(user){
        return (user.name.toLowerCase()).indexOf(query.toLowerCase()) !== -1;
    });
    res.render('./users/index', {
        users: matchUsers,
        q: query
    });
}; 

module.exports.create = function(req, res){
    res.render('./users/create');
};

module.exports.view = async function(req, res){
    var id = req.params.id;
    var user = await User.findById(id);

    res.render('./users/view', {
        user: user
    })
};

module.exports.profile = function(req, res){
    User.find().then(function(users){
        res.render("users/profile", {
            users: users
        });
    })
};

module.exports.postAvatar = async function(req, res){
    var file = await cloudinary.uploader.upload(req.file.path);

    await User.findByIdAndUpdate(req.body.id, { avatar: file.url});

    res.redirect('/users/profile');
}

module.exports.postCreate = async function(req, res){
    await User.create(req.body);
    res.redirect('/users');
};