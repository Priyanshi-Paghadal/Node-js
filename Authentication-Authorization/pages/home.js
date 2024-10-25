const express = require("express");
const jwt = require("jsonwebtoken");
const pageRoutes = express.Router();

pageRoutes.get("/",(req,res)=>{
    res.json({msg:"Welcome to Home Page"});
})

pageRoutes.get("/about",(req,res)=>{
    let token = req.headers.authorization.split(" ")[1];
    console.log("Token = ",token);
    try{
        jwt.verify(token, "node", function(err,decoded){
            console.log(decoded);
            if(decoded){
                res.json({msg:"Welcome to about page"});
            }
            else{
                res.status(404).json({msg:"Login First"})
            }
        })
    }
    catch(error){
        res.status(400).json({msg:"User not authorized"});
    }
});

module.exports = pageRoutes;