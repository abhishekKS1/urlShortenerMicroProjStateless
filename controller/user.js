const User = require("../models/user.js");
const generateRandomCode = require("../utility/ut1.js");
const {setUser}=require("../service/auth.js")

async function handleUserSignup(req, res) {
    const { name, password, email } = req.body;

    await User.create({
        name,
        email,
        password
    });

    res.redirect("/");
}

async function handleUserLogin(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({
        email,
        password
    });

    if (!user)
        return res.render("login", { error: "invalid username or password" });

    
   const token= setUser( user);
    res.cookie("uid", token);
    res.redirect("/");
}

module.exports = { handleUserSignup, handleUserLogin };
