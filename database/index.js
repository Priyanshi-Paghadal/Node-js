const express = require("express");
const app = express()

const ejs = require("ejs");

const multer = require("multer");
const path = require("path")

const { connections } = require("./connections/db")
const usersRoutes = require("./controller/user.route")
let user = require("./Model/model.student")

app.use(express.urlencoded({ extended: true }))

app.use(express.json());

app.use("/imguploads", express.static(path.join(__dirname, "imguploads")))

app.set("view engine", "ejs");

app.use("/users", usersRoutes);

const port = 2700;

app.get("/", (req, res) => {
    res.send("Hello...");
})

// UPLOAD IMAGE

const fileupload = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "imguploads/")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const imageUpload = multer({ storage: fileupload }).single("image");

app.get("/form", async (req, res) => {
    let allData = await user.find();
    console.log(allData);
    res.render("form", {
        userData: allData
    });
})

app.post("/addData", imageUpload, async (req, res) => {
    console.log(req.file)

    let image = "";
    if (req.file) {
        image = req.file.path
    }
    const { name, email, age, password } = req.body;
    const newuser = new user({ name, email, age, password, image });
    await newuser.save();
    res.redirect("/form");
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
    res.render("editData", { editData });
})

app.post('/editData/:id', imageUpload, async (req, res) => {
    const id = req.params.id;
    const editData = req.body;
    const image = req.file;

    if (image) {
        editData.image = image.path;
    }

    let userData = await user.findByIdAndUpdate(id, editData);
    res.redirect("/form");
})

app.listen(port, async (req, res, err) => {
    await connections;
    console.log("server is running at port ", port);
})