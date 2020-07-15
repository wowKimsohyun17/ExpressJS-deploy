var mongoose = require('mongoose');

var sessionSchema = new mongoose.Schema({
    cart:[
        {
            bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book"},
            quantity: Number
        }
    ]
});

var Session = mongoose.model('sessions', sessionSchema);

module.exports = Session;