// const shortid = require("shortid");
// const db = require("../db");
const User = require("../models/users.model");
const Session = require("../models/sessions.model");

module.exports = async (req, res, next) => {

    if (req.signedCookies.userId) {
        let user = await User.findById(req.signedCookies.userId);
        if (user) {
            res.locals.user = user;
        }
    }

    if (!req.signedCookies.sessionId) {
        let newSession = await Session.create({});
        res.cookie("sessionId", newSession.id, {
            signed: true
        });
    }

    let session = await Session.findById(req.signedCookies.sessionId);
    console.log(session);

    let count = 0;

    if (session) {
        for (let book of session.cart) {
            console.log(book);
            count += book.quantity;
        }
    }

    res.locals.count = count;

    next();
};
