const bcrypt = require("bcrypt");

const User = require("../../models/users.model");

const saltRound = 10;

module.exports.login = async (req, res) => {

    var email = req.body.email;
        password = req.body.password;
    
    var user = await User.findOne({ email });

    if(!user){
        res.status(404).json({
            error: "Not found user"
        });
    };

    if (!(await bcrypt.compare(password, user.password))) {
        await User.findByIdAndUpdate(user.id, {
            wrongLoginCount: (user.wrongLoginCount += 1)
        });
    
        res.json({
            error: "Wrong password",
            values: req.body
        });
    
        return;
    };

    res.status(200).json({
        loginStatus: true
    });
}