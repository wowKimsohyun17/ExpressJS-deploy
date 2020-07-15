const db = require("../db.js");
const Session = require("../models/sessions.model");

module.exports.addToCart = async (req, res) => {
    let bookId = req.params.bookId;
    let sessionId = req.signedCookies.sessionId;

    if (!sessionId) {
        res.redirect("/books");
        return;
    }

    // let count = db
    //     .get("session")
    //     .find({ id: sessionId })
    //     .get("cart." + bookId, 0)
    //     .value();

    // db.get("session")
    //     .find({ id: sessionId })
    //     .set("cart." + bookId, count + 1)
    //     .write();
    let session = await Session.findById(sessionId);

    let book = session.cart.find(
        cartItem => cartItem.bookId.toString() === bookId
    );

    if (book) {
        book.quantity += 1;
        session.save();
    } else {
        await Session.findByIdAndUpdate(sessionId, {
            $push: { cart: {bookId, quantity: 1} }
        });
    }

    res.redirect("/books");
};
