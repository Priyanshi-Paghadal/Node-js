const express = require("express");

const authRoutes = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userModel = require("../Model/model.auth");

authRoutes.post("/register", async (req, res) => {
    try {
        const { username, email, password, confirmPassword } = req.body;
        if (!username || !email || !password || !confirmPassword) {
            return res.status(400).json({ message: "Please fill in all fields." });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ msg: "Passwords do not match." });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const newuser = new userModel({
            username, email, password: hashPassword, confirmPassword
        });
        res.status(200).json({ msg: "User Registerd Successfully.." });

        await newuser.save();
        res.status(200).json({ success: true, msg: "User registered Successfully" });
    }
    catch (error) {
        console.log("User not registered ! ", error);
    }
})

authRoutes.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "Please fill in all fields." });
        }
        const checkuser = await userModel.findOne({ username });
        if (!checkuser) {
            res.status(400).json({ msg: "User not found" });
        }
        const matchPassword = await bcrypt.compare(password, checkuser.password);
        if (matchPassword) {
            const token = await jwt.sign({ course: 'node' }, 'node', { expiresIn: '1h' });
            res.cookie("authToken", token);
            res.status(200).json({ success: true, msg: "User logged in Successfully.." });
        }
        else {
            res.status(400).json({ msg: "Password is Incorrect" });
        }
    } catch (error) {
        console.log("User not Logged in ", error);
    }
})

authRoutes.post("/recover", async (req, res) => {
    try {
        const { email } = req.body;
        const checkuser = await userModel.findOne({ email });
        if (!checkuser) {
            res.status(400).json({ msg: "User not found" });
        }
        res.status(200).json({ success: true, msg: "Password Recover successfully.." });
    } catch (error) {
        console.log("Password is not recovered..");
    }
})

module.exports = authRoutes;