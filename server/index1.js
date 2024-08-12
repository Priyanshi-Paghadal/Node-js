let http = require("http");

const port = 9000;

const reqresData = (req,res) =>{
    res.end("My Second Server...");
}

const server = http.createServer(reqresData);

server.listen(port , (req,res) =>{
    console.log("Server is running at port "+port);
})