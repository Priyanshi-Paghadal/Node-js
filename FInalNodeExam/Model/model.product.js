const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: String,
    productPrice: Number,
    productQuantity: Number,
    discription: String
})

const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;