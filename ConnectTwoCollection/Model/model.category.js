const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    categori: String
})

const categoryModel = mongoose.model("Category", categorySchema);

module.exports = categoryModel;