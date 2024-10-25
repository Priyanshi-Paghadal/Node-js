const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userName: String,
    userEmail: String,
    userPassword: String,
    otp: String,
    otpExpires:String
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;