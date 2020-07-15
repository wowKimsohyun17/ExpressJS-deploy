// var db = require('../db');
// var shortId = require('shortid');
const Book = require("../models/books.model");
const User = require('../models/users.model');

var cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
});

module.exports.index = async function(req, res){
    res.render('./books/index', {
        books: await Book.find()
    });
};

module.exports.create = function(req, res){
    res.render('./books/create');
};

module.exports.postCreate = async function(req, res){
    await Book.create(req.body);

    res.redirect('/books');
}

module.exports.delete = async function(req, res){
    var id = req.params.id;
    await Book.findByIdAndRemove(id);

    res.redirect('/books');
};

module.exports.edit = async function(req, res){
    // var book = db.get('books').find({id: req.params.id}).value();
    var book = await Book.findById(req.params.id)
    res.render('./books/edit', {
        book: book
    });
};

module.exports.update = async function(req, res){
    var id = req.params.id;

    res.render('./books/update-cover', {
        book: await Book.findById(id)
    })
};

module.exports.postUpdate = async function(req, res){
    var file = await cloudinary.uploader.upload(req.file.path);

    await Book.findByIdAndUpdate(req.body.id, {coverUrl: file.url});

    res.redirect('/books');
}

module.exports.postEdit = async function(req, res){
    var id = req.params.id;
    // db.get('books').find({id: id}).assign({ title: req.body.title}).write();
    await Book.findByIdAndUpdate(id, { title: req.body.title});
    res.redirect('/books');
};