const express = require("express")
const user = require("../model/model.user")
const userRoutes = express.Router()

// ADD DATA

userRoutes.post("/addData" , async(req,res)=>{

    console.log(req.body)
    let newUser = new user({
        name : req.body.name,
        email : req.body.email,
        age : req.body.age,
    })

    const savedUser = await newUser.save();
    console.log(savedUser)
    res.json({"userdata":savedUser})
})

// GET DATA

userRoutes.get("/getData" , async (req,res)=>{
    const getData = await user.find()
    console.log(getData)
    res.send(getData)
})

// DELETE DATA

userRoutes.delete("/delete/:id" , async(req,res)=>{
    const id = req.params.id
    const deleteData = await user.findByIdAndDelete(id)
    console.log(deleteData)
    res.send(deleteData)
})

// UPDATE DATA

userRoutes.put("/update/:id" , async(req,res)=>{
    const id = req.params.id
    const updateData = await user.findByIdAndUpdate(id,req.body,{new:true})
    console.log(updateData)
    res.send(updateData)
})

module.exports = userRoutes;