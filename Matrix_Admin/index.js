const express = require("express");
require("dotenv").config();
const path = require("path");
const cookieParser = require("cookie-parser");
const app = express();

const connection = require("./Connection/db");
const authRoutes = require("./Routes/route.auth");
const auth = require("./MiddleWare/authMiddleware");

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
app.use("/authRoutes", authRoutes);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
})

app.get("/index.html", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
})

app.get("/index2.html", (req, res) => {
    res.sendFile(path.join(__dirname, "index2.html"));
})

app.get("/charts.html", auth, (req, res) => {
    res.sendFile(path.join(__dirname, "charts.html"));
})

app.get("/widgets.html", auth, (req, res) => {
    res.sendFile(path.join(__dirname, "widgets.html"));
})

app.get("/tables.html", auth, (req, res) => {
    res.sendFile(path.join(__dirname, "tables.html"));
})

app.get("/grid.html", auth, (req, res) => {
    res.sendFile(path.join(__dirname, "grid.html"));
})

app.get("/form-basic.html", auth, (req, res) => {
    res.sendFile(path.join(__dirname, "form-basic.html"));
})

app.get("/form-wizard.html", auth, (req, res) => {
    res.sendFile(path.join(__dirname, "form-wizard.html"));
})

app.get("/pages-buttons.html", auth, (req, res) => {
    res.sendFile(path.join(__dirname, "pages-buttons.html"));
})

app.get("/pages-elements.html", auth, (req, res) => {
    res.sendFile(path.join(__dirname, "pages-elements.html"));
})

app.get("/pages-gallery.html", auth, (req, res) => {
    res.sendFile(path.join(__dirname, "pages-gallery.html"));
})

app.get("/pages-calendar.html", auth, (req, res) => {
    res.sendFile(path.join(__dirname, "pages-calendar.html"));
})

app.get("/pages-invoice.html", auth, (req, res) => {
    res.sendFile(path.join(__dirname, "pages-invoice.html"));
})

app.get("/pages-chat.html", auth, (req, res) => {
    res.sendFile(path.join(__dirname, "pages-chat.html"));
})

app.get("/icon-fontawesome.html", auth, (req, res) => {
    res.sendFile(path.join(__dirname, "icon-fontawesome.html"));
})

app.get("/icon-material.html", auth, (req, res) => {
    res.sendFile(path.join(__dirname, "icon-material.html"));
})

app.get("/authentication-login.html", (req, res) => {
    res.sendFile(path.join(__dirname, "authentication-login.html"));
})

app.get("/authentication-register.html", (req, res) => {
    res.sendFile(path.join(__dirname, "authentication-register.html"));
})

app.get("/error-403.html", auth, (req, res) => {
    res.sendFile(path.join(__dirname, "error-403.html"));
})

app.get("/error-404.html", auth, (req, res) => {
    res.sendFile(path.join(__dirname, "error-404.html"));
})

app.get("/error-405.html", auth, (req, res) => {
    res.sendFile(path.join(__dirname, "error-405.html"));
})

app.get("/error-500.html", auth, (req, res) => {
    res.sendFile(path.join(__dirname, "error-500.html"));
})

app.listen(process.env.PORT, async () => {
    try {
        await connection;
        console.log("Server is Running at port ", process.env.PORT);
    } catch (error) {
        console.log(error);
    }
})