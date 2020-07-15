var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone: String,
    isAdmin: Boolean,
    wrongLoginCount: Number,
    avatar: String
});

var User = mongoose.model('users', userSchema);

module.exports = User;