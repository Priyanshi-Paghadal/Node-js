const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    categori: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
})

const postModel = mongoose.model("post", postSchema);

module.exports = postModel;