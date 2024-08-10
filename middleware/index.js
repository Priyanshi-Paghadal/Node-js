const express = require("express")
const app = express()
const port = 7500
const ejs = require("ejs");

app.set("view engine", "ejs")

app.get("/", (req, res) => {
    res.end("Priyanshi...");
})

const checkpost = (req, res, next) => {
    if (req.query.age >= 18) {
        return next();
    }
    return res.redirect('/')
}

app.get("/home", checkpost, (req, res) => {
    res.render("home")
})

app.listen(port, (error) => {
    if (error) {
        console.log("Something Went Wrong...")
    }
    console.log("Server is running at port ", port);

})