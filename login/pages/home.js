const express = require("express");
const jwt = require("jsonwebtoken");
const pageRoutes = express.Router();

pageRoutes.get("/", (req, res) => {
        res.json({ msg: "Welcome to the home page" });
})

// PROTECT ROUTES

pageRoutes.get("/about", (req, res) => {
        let token = req.headers.authorization.split(" ")[1];
        console.log("About Token = ", token);

        try {
                jwt.verify(token, "node", function (err, decoded) {
                        console.log(decoded)
                        if (decoded) {
                                res.json({ msg: "Welcome to the about page" })
                        }
                        else {
                                res.status(404).json({ msg: "Login First" });
                        }
                });
        }
        catch (error) {
                res.status(400).json({ msg: "User not Aurthorized.." });
        }
})

pageRoutes.get("/contact", (req, res) => {
        let token = req.headers.authorization.split(" ")[1];
        console.log("Contact Token = ", token);

        try {
                jwt.verify(token, "node", function (err, decoded) {
                        console.log(decoded)
                        if (decoded) {
                                res.json({ msg: "Welcome to the Contact page" });
                        }
                        else {
                                res.status(404).json({ msg: "Login First" });
                        }
                });
        }
        catch (error) {
                res.status(400).json({ msg: "User not Aurthorized.." });
        }
})

module.exports = pageRoutes;