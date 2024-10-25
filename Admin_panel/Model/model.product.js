const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productName: String,
    price: Number,
    rating: Number,
    quantity: Number,
    category: String,
    discription: String
});

const productModel = mongoose.model("Products", productSchema);

module.exports = productModel;