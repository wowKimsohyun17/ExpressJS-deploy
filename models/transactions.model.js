var mongoose = require('mongoose');

var transactionSchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.ObjectId, ref: "User"},
    bookID: { type: mongoose.Schema.ObjectId, ref: "Book"},
    isComplete: Boolean
});

var Transaction = mongoose.model('transactions', transactionSchema);

module.exports = Transaction;