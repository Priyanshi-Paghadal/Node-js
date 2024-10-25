const express = require("express");
const userModel = require("../model/model.auth");
const passport = require("passport");
const bcrypt = require("bcrypt");
const authRoutes = express.Router();

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/auth/loginData");
}

authRoutes.get("/registerData", (req, res) => {
    res.render("register");
})

authRoutes.get("/loginData", (req, res) => {
    res.render("login");
})

authRoutes.get("/home", isAuthenticated, (req, res) => {
    res.render("home");
})

authRoutes.get("/about",  isAuthenticated,(req, res) => {
    res.render("about");
})

authRoutes.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body
        console.log(req.body);
        if (!username) {
            return res.json({ msg: "username is required" })
        }
        if (!password) {
            return res.json({ msg: "password is required" })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new userModel({ username, password: hashedPassword });
        await user.save();

        res.status(200).json({ msg: "user registered successfully" })

    } catch (error) {
        res.status(400).json({ msg: "someting is wrong ", error })
    }
})

authRoutes.post('/login',
    passport.authenticate('local', { failureRedirect: '/auth/loginData', failureFlash: true }),
    (req, res) => {
        res.status(200).json({ msg: "login successfull.." });
        // res.render("home");
    }
);

module.exports = authRoutes;