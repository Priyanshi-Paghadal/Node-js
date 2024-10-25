const express = require("express");

const userRoutes = express.Router();

const user = require("../Model/model.auth");

userRoutes.post('/register', async (req, res) => {
    try {
        const { name, email } = req.body;
        const newUser = new user({ name, email });
        await newUser.save();
        res.json({ msg: "User added successfully.." });
    } catch (error) {
        console.log(error);
    }
})

module.exports = userRoutes;