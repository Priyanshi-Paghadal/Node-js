const express = require("express");
const app = express()

const {connections} = require('./connections/db')
const usersRoutes = require('./controller/user.route')

app.use(express.json());
app.use("/users", usersRoutes);

const port = 2700;

app.get("/", (req, res) => {
    res.end("Hello...");
})

app.listen(port, async (req, res, err) => {
    await connections;
    console.log("server is running at port ", port);
})

