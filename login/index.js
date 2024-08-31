const express = require("express");
const app = express()
const bcrypt = require("bcrypt");

const { connection } = require("./connection/db");
const user = require("./model/model.user");

app.use(express.json())

const port = 7777;

app.get("/", (req, res) => {
    res.send("Hello..");
})

// REGISTER

app.post("/register", async (req, res) => {
    console.log(req.body);
    const { name, email, password } = req.body;
    const hashpassword = await bcrypt.hash(password, 5);
    const newuser = new user({ name, email, password: hashpassword });
    await newuser.save();
})

// LOGIN

app.post("/login", async (req, res) => {
    console.log(req.body);
    const { email, loginpassword } = req.body;
    const checkuser = await user.findOne({ email });
    console.log(checkuser);
    if (!checkuser) {
        res.status(400).json({ msg: "wrong credentials" })
    } else {
        const matchedPass = await bcrypt.compare(loginpassword, checkuser.password);
        if (!matchedPass) {
            res.status(401).json({ msg: "Invalid password" });
        } else {
            res.status(200).json({ msg: "login successful" });
        }
    }

})

app.listen(port, async () => {
    await connection;
    console.log("Server is running at port ", port)
})