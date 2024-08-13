const express = require("express");
const app = express()
const {connection} = require("./connection/db")
const userRoutes = require("./controller/user.routes")

app.use(express.json())

app.use("/users", userRoutes);

const port = 9999;

app.get("/", (req, res) => {
    res.end("Hello World");
})

app.listen(port, async (req, res, err) => {
    await connection;
    console.log("server is running at port ", port);
})