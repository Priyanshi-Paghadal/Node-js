const express = require("express");
const app = express()
const {connection} = require("./connection/db")
const userRoutes = require("./controller/user.routes")

app.use(express.json()) // for convert string data to json

app.use("/users", userRoutes);  // for make route

const port = 9999;

app.get("/", (req, res) => {
    res.end("Hello World");
})

app.listen(port, async (req, res, err) => {
    await connection;
    console.log("server is running at port ", port);
})