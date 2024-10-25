const express = require("express");
require("dotenv").config();
const ejs = require("ejs");
const cookieParser = require("cookie-parser");

const app = express();

app.set("view engine", "ejs");

const connection = require("./Connection/db");
const authRoutes = require("./Routes/route.auth");
const proRoutes = require("./Routes/route.product");

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/pro", proRoutes);

app.get("/", (req, res) => {
    res.end("Hello");
})

app.listen(process.env.PORT, async () => {
    try {
        await connection;
        console.log("Server is Running at port ,", process.env.PORT);
    } catch (error) {
        console.log(error);
    }
})