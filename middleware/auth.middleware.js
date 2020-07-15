var db = require('../db');
var User = require("../models/users.model")

module.exports.requireAuth = async function(req, res, next){

    if(!req.signedCookies.userId){
        res.redirect('/auth/login');
        return;
    };

    // var user = db.get('users').find({id: req.signedCookies.userId}).value();
    let user = await User.findById(req.signedCookies.userId);

    if(!user){
        res.redirect('/auth/login');
        return;
    }

    res.locals.user = user;

    next();
}