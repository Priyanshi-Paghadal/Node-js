const express = require("express");
const task = require("../model/model.task")

const taskRoutes = express.Router();

// ADD DATA

taskRoutes.post("/addData", async(req, res) => {
    console.log(req.body)
    const newtask = new task({
        name: req.body.name
    })

    const alltask = await newtask.save();
    console.log(alltask)
    res.send(alltask);

})

// GET DATA

taskRoutes.get("/getData" , async(req,res)=>{
    const getData = await task.find()
    console.log(getData)
    res.send(getData)
})

taskRoutes.delete("/delete/:id" , async(req,res)=>{
    let {id} = req.params;
    const deleteData = await task.findByIdAndDelete(id)
    console.log(deleteData)
    // res.redirect("/");
})

module.exports = taskRoutes;