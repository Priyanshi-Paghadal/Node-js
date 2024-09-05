const express = require("express");
const authRoutes = express.Router();
const bcrypt = require("bcrypt");
const user = require("../model/model.user");
const jwt = require("jsonwebtoken");

// REGISTER

authRoutes.post("/register", async (req, res) => {
    console.log(req.body);
    const { name, email, password } = req.body;
    const hashpassword = await bcrypt.hash(password, 5);
    const newuser = new user({ name, email, password: hashpassword });
    await newuser.save();
})

// LOGIN

authRoutes.post("/login", async (req, res) => {
    console.log(req.body);
    const { email, loginpassword } = req.body;
    const checkuser = await user.findOne({ email });
    console.log(checkuser);
    if (!checkuser) {
        res.status(400).json({ msg: "wrong credentials" })
    } else {
        const matchedPass = await bcrypt.compare(loginpassword, checkuser.password);
        if (matchedPass) {
            let token = jwt.sign({ course: "node" }, "node");
            console.log(token, "token");
            res.status(401).json({ msg: "Login Succesfull" });
        } else {
            res.status(200).json({ msg: "Invalid Password" });
        }
    }
})

module.exports = authRoutes;