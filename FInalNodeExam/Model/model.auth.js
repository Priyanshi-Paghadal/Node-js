const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: String,
    userEmail: String,
    userPassword: String
})

const userModel = mongoose.model("userModel", userSchema);

module.exports = userModel;