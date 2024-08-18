const express = require("express");
const app = express()

const ejs = require("ejs");

const { connections } = require('./connections/db')
const usersRoutes = require('./controller/user.route')
let user = require("./Model/model.student")

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.set("view engine", "ejs");
app.use("/users", usersRoutes);
const port = 2700;

app.get("/", (req, res) => {
    res.send("Hello...");
})

app.get("/form", async (req, res) => {
    let allData = await user.find();
    console.log(allData);
    res.render("form", {
        userData: allData
    });
})

app.post("/addData", async (req, res) => {
    try {
        const { name, email, age, password } = req.body;
        const newuser = new user({ name, email, age, password });
        await newuser.save();
        res.redirect("/form");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding data");
    }
});

// DELETE DATA

app.get("/delete", async (req, res) => {
    let id = req.query.id;
    console.log(id);
    let deleteData = await user.findByIdAndDelete(id);
    console.log(deleteData);
    res.redirect("/form")
})

// UPDATE DATA

app.get("/edit/:id", async (req, res) => {
    let id = req.params.id;
    let editData = await user.findById(id);
    res.render('editData', { editData });
})

app.post("/editData/:id", async (req, res) => {
    let editId = req.params.id;
    let userData = await user.findByIdAndUpdate(editId, req.body);
    res.redirect("/form");
})

app.listen(port, async (req, res, err) => {
    await connections;
    console.log("server is running at port ", port);
})