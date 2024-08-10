const http = require("http");
const fs = require("fs");

const port = 9999;

const requestData = (req,res)=>{
    // res.end("My First Server...");
    console.log(req.url);
    let fileName = "";
    switch(req.url){
        case "/":
            fileName = "./index.html";
            break;
        case "/home":
            fileName = "./home.html";
            break;
        case "/contact":
            fileName = "./contact.html";
            break;
    }

    fs.readFile(fileName , (err , result)=>{
        if(!err){
            res.end(result);
        }
    })
}

const server = http.createServer(requestData);

server.listen(port,(req,res) =>{
    console.log("Server is running on port ",port);
});