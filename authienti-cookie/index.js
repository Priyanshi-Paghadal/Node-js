const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();

const port = 7878;

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

const middleWare = (req, res, next) => {
    const token = req.cookies.token;
    if (token && token === "valid_token") {
        next();
    }
    else {
        res.status(401).json({ msg: "Unauthorized" });
    }
}

app.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (email === "pri@gmail.com" && password === "pri123") {
        const token = "valid_token";
        res.cookie("token", token, { httpOnly: true });
        res.json({ message: "Login Successfull", token });
    }
    else {
        res.status(401).json({ msg: "Wrong Credentials.." });
    }
})

app.post("/logout", (req, res) => {
    res.clearCookie(token);
    res.status(200).json({ msg: "Log out successfully.." });
})

app.get("/protected", middleWare, (req, res) => {
    res.status(200).json({ msg: "This is Protected Route" });
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})