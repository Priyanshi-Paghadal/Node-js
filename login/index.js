const express = require("express");
const app = express()

const ejs = require("ejs");

const { connection } = require("./connection/db");
const user = require("./model/model.user");
const userRoutes = require("./controller/user.routes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use("/user", userRoutes);

const port = 7777;

app.set("view engine","ejs");

app.get("/", (req, res) => {
    res.send("Hello..");
})

app.listen(port, () => {
    console.log("Server is running at port ", port)
})