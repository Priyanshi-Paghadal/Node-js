const express = require("express");
const app = express();

const port = 9000;

const { connection } = require("./connection/db");
const authRoutes = require("./route/route.auth");
const pageRoutes = require("./pages/home")

app.use(express.json());

app.use("/auth",authRoutes);
app.use("/",pageRoutes)

app.listen(port, async () => {
    await connection;
    console.log('server is Running at port ', port);
})