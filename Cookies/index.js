const express = require("express");
const app = express();

const cookie = require('cookie-parser');
app.use(cookie());
const port = 8080;

app.get("/", (req, res) => {
    res.send("Home page");
})

const user = {
    name: "hemanshi",
    age: 18
}

app.get("/setcookies", (req, res) => {
    res.cookie("user", user);
    res.send("user data added");
})

app.get("/getcookies", (req, res) => {
    res.send(req.cookies);
})

app.listen(port, () => {
    console.log("Server is running at port ", port);
})