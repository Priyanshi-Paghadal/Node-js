const express = require("express");
const app = express();
const port = 15000;

app.listen(port, () => {
    console.log("Server is running on port ", port);
})

app.set("view engine", "ejs");
app.get("/", (req, res) => {
    res.render("index");
})
app.get("/index", (req, res) => {
    res.render("index");
})
app.get("/about", (req, res) => {
    res.render("about");
})
app.get("/contact", (req, res) => {
    res.render("contact");
})
