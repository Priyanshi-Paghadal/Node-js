const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const adminModel = mongoose.model("adminData", adminSchema);

module.exports = adminModel;