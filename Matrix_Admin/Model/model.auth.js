const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    confirmPassword: String
})

const userModel = mongoose.model("adminUser", userSchema);

module.exports = userModel;