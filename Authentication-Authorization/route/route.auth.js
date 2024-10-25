const express = require("express");

const authRoutes = express.Router();

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const user = require("../model/model.user")

authRoutes.post("/register", async (req, res) => {
    console.log(req.body);
    const { name, email, password } = req.body;
    const hashpassword = await bcrypt.hash(password, 5);
    const newuser = new user({ name, email, password: hashpassword });
    await newuser.save();
})

authRoutes.post("/login", async (req, res) => {
    console.log(req.body);
    const { email, loginpassword } = req.body;
    const checkuser = await user.findOne({ email });
    if (!checkuser) {
        res.status(400).json({ msg: "User not found" });
    }
    else {
        const matchpassword = await bcrypt.compare(loginpassword, checkuser.password);
        if (matchpassword) {
            let token = jwt.sign({ course: "node" }, "node");
            res.status(200).json({ msg: "Login Successfull.." ,token});
        }
        else {
            res.status(400).json({ msg: "Invalid Password" });
        }
    }
});

module.exports = authRoutes;