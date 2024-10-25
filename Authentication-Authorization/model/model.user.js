const mongoose = require("mongoose");

const user = new mongoose.Schema({
    name:String,
    email:String,
    password:String
})

const userModel = mongoose.model("userdata",user);

module.exports = userModel;