// var db = require('../db');
// var shortId = require('shortid');
// const shortid = require('shortid');
const Transaction = require("../models/transactions.model");
const Book = require("../models/books.model");
const User = require("../models/users.model");
const Session = require("../models/sessions.model");

// let books = await Book.find();
// let users = await User.find();
// let transactions = await Transaction.find();


module.exports.index = async function(req, res){
  let transactions = await Transaction.find();
  res.render('./transactions/index', {
    trans: transactions
  });
};

module.exports.create = async function(req, res){
  let books = await Book.find();
  let users = await User.find();
  res.render('./transactions/create', {
    users: users,
    books: books
  });
};

module.exports.postCreate = async function(req, res){

  await Transaction.create(req.body);
  // db.get('transactions').push(newTrans).write();
  res.redirect('/transactions');
};

module.exports.hire = async function(req, res){
  var session = await Session.findById(req.signedCookies.sessionId);

  if (session){
    for(var book in session.cart){
      for(var i = 0; i < session.quantity; i++){
        await Transaction.create({
          bookId: book.bookId,
          userId: req.signedCookies.userId
        });
      }
    }
    session.cart = [];
    session.save();

    res.redirect("/transactions");
    return;
  }
}

module.exports.complete = async function(req, res){
    var id = req.params.id;
    await Transaction.findByIdAndUpdate(id, { isComplete: true});

    res.redirect('/transactions');
}