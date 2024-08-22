const express = require("express");
const app = express()

const ejs = require("ejs");

const {connection} = require("./connection/db");
const taskRoutes = require("./controller/task.routes");
const task = require("./model/model.task");

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.set("view engine", "ejs");
app.use("/tasks", taskRoutes);

const port = 8888;

app.get("/", async(req,res) => {
    let tasks = await task.find()
    res.render("home" , {
        allTask : tasks
    });
});

app.post("/addData" , async(req,res)=>{
    const { name} = req.body;
    const newtask = new task({ name});
    await newtask.save();
    res.redirect("/");
})

app.listen(port, async() => {
    await connection;
    console.log("server is running at port ", port);
})