// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const User = require("../models/users.model")

var db = require('../db');
var md5 = require('md5');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports.login = function(req, res){
    res.render('./auth/login');
}

module.exports.postLogin = async function(req, res){
    var email = req.body.email;
    var password = req.body.password;
    var user = await User.findOne({ email });
    

    if(!user){
        res.render('./auth/login', {
            errors: [
                "User does not exist"
            ],
            values: req.body
        });
        return;
    }

    // if(user.password !== hash){
    //     res.render('./auth/login', {
    //         errors: [
    //             "Password is wrong"
    //         ]
    //     });
    //     return;
    // }

    if(!user.wrongLoginCount){
        await User.findByIdAndUpdate(user.id, {
            wrongLoginCount: 0
        });
    }

    if(user.wrongLoginCount >= 4){
        // var msg = {
        //     to: "hadesi1999@gmail.com",
        //     from: 'caoquydang99@gmail.com', // Use the email address or domain you verified above
        //     subject: "Your account has been locked.",
        //     text: "Your account has been locked, because you entered the wrong password too many times",
        //     html: "<strong>Contact us if u want more information</strong>",
        // };

        // try{
        //     await sgMail.send(msg);
        // }catch(err){
        //     console.log(err);
        // }

        res.render('./auth/login', {
            errors: ["Your account has been locked."],
            values: req.body
        });

        return;
    }

    if (!(await bcrypt.compare(password, user.password))) {
        await User.findByIdAndUpdate(user.id, {
            wrongLoginCount: (user.wrongLoginCount += 1)
        });
    
        res.render("./auth/login", {
          errors: ["Wrong password."],
          values: req.body
        });
    
        return;
    }

    res.cookie('userId', user.id, { 
        signed: true
    });
    res.redirect('/users');
}