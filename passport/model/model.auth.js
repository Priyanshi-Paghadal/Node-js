const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    password: String
})

const userModel = mongoose.model("passport-user", userSchema);

module.exports = userModel;