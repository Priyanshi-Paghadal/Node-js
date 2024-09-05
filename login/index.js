const express = require("express");
const app = express()
const authentication = require("./routes/route.auth");
const pagesRoutes = require("./pages/home");
const { connection } = require("./connection/db");
app.use(express.json())

app.use("/auth", authentication);

app.use("/" , pagesRoutes);

const port = 7777;

app.listen(port, async () => {
    await connection;
    console.log("Server is running at port ", port)
})