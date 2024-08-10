const express = require('express');
const user = require("../Model/model.student")
const userRoutes = express.Router();

// add data

userRoutes.post("/addData", async (req, res) => {
    console.log(req.body)
    let newUser = new user({
        name : req.body.name,
        email : req.body.email,
        age : req.body.age,
        password : req.body.password
    })

    const savedUser = await newUser.save();
    console.log(savedUser)
    res.json({"userdata":savedUser})

})

// getData

userRoutes.get("/getData" , async(req,res)=>{
    const getData = await user.find()
    console.log(getData)
    res.send(getData)
})

module.exports = userRoutes;

