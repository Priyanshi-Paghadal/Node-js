const express = require('express');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const userModel = require("../Model/model.user");
const productModel = require("../Model/model.product");
const authRoutes = express.Router();

authRoutes.get("/register", (req, res) => {
    res.render("signup");
})

authRoutes.get("/login", (req, res) => {
    res.render("login");
})

authRoutes.get("/userHome", async (req, res) => {
    const data = await productModel.find();
    console.log(data);
    res.render("userHome", { data });
})

authRoutes.get("/updatePassword", (req, res) => {
    res.render("updatePassword");
})

authRoutes.get("/verifyOTP", (req, res) => {
    res.render("verifyOTP");
})

authRoutes.post("/register", async (req, res) => {
    try {
        console.log(req.body);
        const { userName, userEmail, userPassword } = req.body;
        if (!userName || !userEmail || !userPassword) {
            return res.status(400).json({ message: 'Please fill in all fields' });
        }
        const hashPassword = await bcrypt.hash(userPassword, 5);
        const user = new userModel({
            userName, userEmail, userPassword: hashPassword
        })
        await user.save();
        res.status(200).json({ msg: "Register Successfully", success: true })
    } catch (error) {
        console.log("Something went wrong...");
    }
})

authRoutes.post("/login", async (req, res) => {
    try {
        console.log(req.body);
        const { userEmail, userPassword } = req.body;
        if (!userEmail || !userPassword) {
            return res.status(400).json({ message: 'Please fill in all fields' });
        }
        const checkuser = await userModel.findOne({ userEmail });
        console.log("Login User " + checkuser);
        if (!checkuser) {
            return res.status(400).send({ message: "Invalid Email" });
        }

        const matchPassword = await bcrypt.compare(userPassword, checkuser.userPassword);
        if (matchPassword) {
            const token = jwt.sign({ course: 'node' }, 'node', { expiresIn: '1h' });
            res.cookie("authToken", token);
            res.status(200).json({ success: true, msg: "Login Succesfully.." });
            console.log(token);
        }
        else {
            res.status(401).json({ success: false, msg: "Invalid Password" });
        }
    } catch (error) {
        console.log("Log In First");
    }
})

authRoutes.post("/updatePassword", async (req, res) => {
    try {
        console.log(req.body);
        const { userEmail, oldPassword, newPassword } = req.body;

        if (!userEmail || !oldPassword || !newPassword) {
            res.status(400).json({ msg: "All fileds Are required..." });
        }

        const user = await userModel.findOne({ userEmail });
        console.log(user);
        if (user) {
            const passwordMatch = await bcrypt.compare(oldPassword, user.userPassword);
            if (!passwordMatch) {
                return res.status(400).json({ message: 'Old Password is incorrect' });
            }
            const hashedNewPassword = await bcrypt.hash(newPassword, 5);
            user.userPassword = hashedNewPassword;
            await user.save();
            res.status(200).json({ message: 'Password updated successfully' });
        }
        else {
            return res.status(400).json({ message: 'User not found' });
        }

    }
    catch (error) {
        console.log("Password Not Changed");
    }
})

authRoutes.get("/generateOtp", (req, res) => {
    res.render("generateOtp");
})

authRoutes.post("/generateOtp", async (req, res) => {

    try {
        const { userEmail } = req.body;
        console.log(userEmail);
        if (!userEmail) {
            res.status(400).json({ msg: "Email is required ! " });
        }

        //verify the email in database
        const user = await userModel.findOne({ userEmail });

        if (!user) {
            res.status(404).json({ msg: 'User not found, invalid email' })
        }

        // if email matches successfully then generate otp
        console.log("otp  generated")
        res.status(200).json({ success: true, msg: "Opt send successfully" });

        const transporter = nodemailer.createTransport({
            host: "priyanshipaghadal07@gmail.com",
            service: "gmail",
            auth: {
                user: "priyanshipaghadal07@gmail.com",
                pass: "xity llwi tdes ubzy",
            },
        });

        let randomOtp = Math.floor(1000 + Math.random() * 9000).toString();
        let otpExpires = Date.now() + 60 * 10 * 1000;

        console.log(randomOtp)

        user.otp = randomOtp;
        user.otpExpires = otpExpires;
        await user.save(); // store the otp in data bse


        async function main() {
            // send mail with defined transport object
            const info = await transporter.sendMail({
                from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
                to: user.userEmail, // list of receivers
                subject: "Hello ✔", // Subject line
                text: randomOtp, // plain text body
            });

            console.log("Message sent: %s", info.messageId);
            // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
        }
        main().catch(console.error);

    } catch (error) {
        res.status(400).json({ msg: "Otp not sent something is wrong", error })
    }
})

authRoutes.post('/verifyOTP', async (req, res) => {
    const { userEmail, otp, newPassword } = req.body;
    console.log(userEmail, otp, newPassword)

    try {
        if (!userEmail || !otp || !newPassword) {
            res.status(400).json({ msg: "All fileds are required" });
        }
        const user = await userModel.findOne({
            userEmail,
            otp,
            otpExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ msg: 'Invalid OTP or OTP has expired.' });
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 5);

        user.userPassword = hashedNewPassword;
        user.otp = undefined;
        user.otpExpires = undefined;

        await user.save();

        res.status(200).json({ success: true, msg: 'Password has been reset successfully.' });
    } catch (error) {
        res.status(500).json({ msg: 'Error resetting password', error });
    }
});

module.exports = authRoutes;