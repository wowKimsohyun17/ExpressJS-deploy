// var db = require('../db');
// var shortId = require('shortid');
const Book = require("../../models/books.model");
const User = require('../../models/users.model');

var cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
});

module.exports.index = async function(req, res){
    res.status(200).json({
        books: await Book.find()
    });
};

module.exports.postCreate = async function(req, res){
    const defaultImage = "http://res.cloudinary.com/dpymvfnzy/image/upload/v1594135954/kw4m0xg0iahvojccofzd.jpg"
    const book = new Book({
        title: req.body.title,
        description: req.body.description,
        coverUrl: req.body.coverUrl ? req.body.coverUrl : defaultImage
    });
    book
        .save()
        .then( result => {
            console.log(result)
            res.status(201).json({
                message: "Book created"
            });
        })
        .catch( err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
}

// module.exports.delete = async function(req, res){
//     var id = req.params.id;
//     var book = await Book.findByIdAndRemove(id);
//     console.log(book);
//     res.json({book: "123"});
// };