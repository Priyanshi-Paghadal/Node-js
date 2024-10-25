const express = require("express");
const userModel = require("../Model/model.auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authRoutes = express.Router();

authRoutes.get("/registerData", (req, res) => {
    res.render("register");
})

authRoutes.get('/loginData', (req, res) => {
    res.render("login");
})

authRoutes.post("/register", async (req, res) => {
    try {
        const { userName, userEmail, userPassword } = req.body;
        const hashedPassword = await bcrypt.hash(userPassword, 10);
        if (!userName || !userEmail || !userPassword) {
            res.status(400).json({ msg: "All fileds are required" });
        }
        const newuser = new userModel({
            userName, userEmail, userPassword: hashedPassword
        });
        await newuser.save();
        res.status(200).json({ success: true, msg: "Register successfull" });
    } catch (error) {
        console.log("user not Register.", error);
    }
});

authRoutes.post("/login", async (req, res) => {
    try {
        const { userEmail, userPassword } = req.body;
        if (!userEmail || !userPassword) {
            res.status(400).json({ msg: "All fileds are required" });
        }
        const checkuser = await userModel.findOne({ userEmail });
        if (!checkuser) {
            return res.status(400).json({ msg: "User not found" });
        }
        const matchPassword = bcrypt.compare(userPassword, checkuser.userPassword);
        if (matchPassword) {
            const token = jwt.sign({ course: 'node' }, 'node', { expiresIn: '1h' });
            res.cookie("authToken", token);
            res.status(200).json({ success: true, msg: "Login successFull" });
            console.log(token);
        }
        else{
            res.status(400).json({ msg: "Invalid Password" });
        }
    } catch (error) {
        console.log("User can not Login ", error);
    }
})

module.exports = authRoutes;