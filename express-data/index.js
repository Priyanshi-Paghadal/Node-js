const express = require("express")
const app = express()
const ejs = require("ejs")

app.use(express.urlencoded({ extended: true }));

let studentData = [
    {
        id: 1,
        name: "Foram",
        EnrlNo: "25",
        course: "Backend Development",
        MobileNo: "99887 76655"
    },
    {
        id: 2,
        name: "Rizaa",
        EnrlNo: "20",
        course: "Frontend Development",
        MobileNo: "99887 76655"
    },
    {
        id: 3,
        name: "Hemanshi",
        EnrlNo: "30",
        course: "Fullstack Development",
        MobileNo: "99887 76655"
    },
    {
        id: 4,
        name: "Yashvi",
        EnrlNo: "90",
        course: "Graphic Designer",
        MobileNo: "99887 76655"
    },
    {
        id: 5,
        name: "Ansi",
        EnrlNo: "38",
        course: "Ui-Ux Designer",
        MobileNo: "99887 76655"
    }
];
const port = 20000;

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("home");
})
app.get("/about", (req, res) => {
    res.render("about");
})
app.get("/form", (req, res) => {
    res.render("form", {
        student: studentData
    });
})

//add data

app.post("/addData", (req, res) => {
    let id = Number(req.body.id);
    let name = req.body.name;
    let EnrlNo = req.body.EnrlNo;
    let course = req.body.course;
    let MobileNo = req.body.MobileNo;
    let obj = {
        id: id,
        name: name,
        EnrlNo: EnrlNo,
        course: course,
        MobileNo: MobileNo
    };
    studentData.push(obj);
    res.redirect("back");
})

//delete data

app.get("/delete", (req, res) => {
    let userId = Number(req.query.id);
    studentData = studentData.filter((item) => item.id !== userId)
    res.redirect("back");
})

//Update data

app.get("/edit", (req, res) => {
    let userId = Number(req.query.id);
    let editData = studentData.filter((item) => item.id === userId);
    res.render('editData', { editData: editData[0] });
})

app.post("/editData", (req, res) => {
    let editId = Number(req.body.id);
    studentData = studentData.map((item) => {
        if (item.id === editId) {
            item.name = req.body.name;
            item.EnrlNo = req.body.EnrlNo;
            item.course = req.body.course;
            item.MobileNo = req.body.MobileNo;
        }
        return item;
    })
    res.redirect("/form");
})

app.listen(port, (error) => {
    if (error) {
        console.log("Something went wrong");
    }
    console.log("Server is running at port ", port);
})