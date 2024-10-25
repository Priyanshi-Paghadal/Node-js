const express = require("express");
const postRoutes = express.Router();
const Post = require("../Model/model.post");
const Category = require("../Model/model.category");

postRoutes.post("/add", async (req, res) => {
    try {
        const { title, content, author, categori } = req.body;
        const newPost = new Post({
            title, content, author, categori
        });
        await newPost.save();
        res.json({ msg: "Post Added Successfully.." });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Post not added.." })
    }
});

postRoutes.post("/addCategory", async (req, res) => {
    try {
        const { categori } = req.body;
        const newCategory = new Category({
            categori
        });
        await newCategory.save();
        res.json({ msg: "category added successfully.." });
    } catch (error) {
        console.log("Category can not added..", error);
    }
})

postRoutes.get("/get", async (req, res) => {
    try {
        const posts = await Post.find()
            .populate('author')
            .populate('categori');
        res.json({ msg: "Post Received", posts })
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Post can not get" });
    }
})

module.exports = postRoutes;