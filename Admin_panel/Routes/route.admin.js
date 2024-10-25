const express = require("express");
const adminRoutes = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const adminModel = require("../Model/model.admin");

adminRoutes.get("/adminRegister", (req, res) => {
    res.render("registera");
});

adminRoutes.get("/login", (req, res) => {
    res.render("logina");
})

adminRoutes.get("/updatePassword", (req, res) => {
    res.render("updatepassworda");
})

adminRoutes.post("/adminData", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashpassword = await bcrypt.hash(password, 5);
        const admin = new adminModel({ name, email, password: hashpassword });
        await admin.save();
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please fill in all fields" });
        }
        res.status(200).json({ success: true, msg: "Data added succesfully.." });
        console.log(admin);
    }
    catch (error) {
        console.log(error);
    }
});

adminRoutes.post("/login", async (req, res) => {
    try {
        console.log(req.body);
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ msg: "all fields are required" });
        }
        const checkuser = await adminModel.findOne({ email });
        console.log(checkuser);
        if (!checkuser) {
            res.status(400).json({ msg: "User not found" });
        }
        else {
            const matchpassword = await bcrypt.compare(password, checkuser.password);
            if (matchpassword) {
                let token = jwt.sign({ course: "node" }, "node", { expiresIn: '1h' });
                res.cookie("authToken", token);
                res.status(200).json({ success: true, msg: "Login Successfull..." });
                console.log(token);
            }
            else {
                res.status(400).json({ success: false, msg: "Invalid Password" });
            }
        }
    }
    catch (error) {
        console.log(error);
    }
})

adminRoutes.post("/updatePassword", async (req, res) => {
    try {
        console.log(req.body);
        const { email, oldPassword, newPassword } = req.body;

        if (!email || !oldPassword || !newPassword) {
            res.status(400).json({ msg: "All fileds Are required..." });
        }

        const user = await adminModel.findOne({ email });
        console.log(user);
        if (user) {
            const passwordMatch = await bcrypt.compare(oldPassword, user.password);
            if (!passwordMatch) {
                return res.status(400).json({ message: 'Old Password is incorrect' });
            }
            const hashedNewPassword = await bcrypt.hash(newPassword, 5);
            user.password = hashedNewPassword;
            await user.save();
            res.status(200).json({ message: 'Password updated successfully' });
        }
        else {
            return res.status(400).json({ message: 'User not found' });
        }

    }
    catch (error) {
        console.log("Password Not Changed", error);
    }
})

module.exports = adminRoutes;