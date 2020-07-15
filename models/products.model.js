var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    name: String,
    image: String,
    descriptions: String,
    price: Number
});

var Product = mongoose.model('products', productSchema);

module.exports = Product;