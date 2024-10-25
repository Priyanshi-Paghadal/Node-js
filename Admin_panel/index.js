const express = require("express");
const app = express();
const path = require("path");
const ejs = require("ejs");
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));

const session = require('express-session');
const cookieParser = require("cookie-parser");
const flash = require("connect-flash")
const connection = require("./Connection/db");
const proRoutes = require("./Routes/route.product");
const adminRoutes = require("./Routes/route.admin");
const authRoutes = require("./Routes/route.auth");
const productModel = require("./Model/model.product");

const port = 9090;

app.use(express.json());

app.use(flash());
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3000 }
}));

app.use(cookieParser());
app.use("/proRoutes", proRoutes);
app.use("/adminRoutes", adminRoutes);
app.use("/authRoutes", authRoutes);

// app.get("/", async (req, res) => {
//     const data = await productModel.find();
//     console.log(data);
//     res.render("userHome", { data });
// })

app.get("/",async(req,res)=>{
    res.render("index");
})

app.listen(port, async () => {
    try {
        await { connection };
        console.log("Server is running at port ", port);
    }
    catch (error) {
        console.log(error);
    }
});