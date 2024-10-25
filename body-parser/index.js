// const express = require("express");
// const bodyParser = require("body-parser");
// const cookieParser = require("cookie-parser");
// const app = express();

// const port = 9090;

// app.use(bodyParser.json());
// app.use(cookieParser());

// const authMiddleware = (req, res, next) => {
//     const { authToken } = req.cookies;
//     if (authToken && authToken === 'VALID_TOKEN') {
//         next();
//     }
//     else {
//         res.status(401).json({ message: "Unauthorized" });
//     }
// }

// app.post("/login", (req, res) => {
//     const { email, password } = req.body;

//     if (email === "pri@gmail.com" && password === "pri@123") {
//         const authToken = 'VALID_TOKEN';
//         res.cookie('authToken', authToken, { httpOnly: true });
//         res.status(200).json({ msg: "Login Successfull..." });
//     }
//     else {
//         res.status(401).json({ msg: "Invalid Credentials..." });
//     }
// })

// app.post("/logout", (req, res) => {
//     res.clearCookie('authToken');
//     res.status(200).json({ msg: "Logout Successfull..." });
// })

// app.get("/protected", authMiddleware, (req, res) => {
//     res.status(200).json({ msg: "This is Protected Route..." });
// })

// app.listen(port, () => {
//     console.log("Server is running at port ", port);
// })

const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();

const port = 9898;

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

const authMiddleware = (req, res, next) => {
    const { token } = req.cookies;
    if (token && token === 'valid_token') {
        next();
    }
    else {
        res.status(401).json({ message: "Unauthorized" });
    }
}

app.post("/login", (req, res) => {
    try {
        const { email, password } = req.body;
        if (email === "pri@gmail.com" && password === "123") {
            const token = "valid_token";
            res.cookie("token", token, { httpOnly: true })
            res.status(200).json({ msg: "Login SuccessFull ..." });
        }
        else {
            res.status(401).json({ msg: "Invalid Credentials..." });
        }
    }
    catch (error) {
        res.status(400).json({ msg: "Login First" });
    }
});

app.post("/logout", (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ msg: "Logout Successfull..." });
})

app.get("/protected", authMiddleware, (req, res) => {
    res.status(200).json({ msg: "This is protected Route..." });
})

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
})