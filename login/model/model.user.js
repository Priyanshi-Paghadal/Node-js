const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password:String,
})

const usermodel = mongoose.model("userSchema", userSchema);

module.exports = usermodel;