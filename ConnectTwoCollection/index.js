const express = require("express");
require("dotenv").config();
const connection = require("./Connection/db");
const userRoutes = require("./Routes/user.route");
const postRoutes = require("./Routes/post.route");

const app = express();

app.use(express.json());
app.use("/userRoutes", userRoutes);
app.use("/postRoutes", postRoutes);

app.get("/", (req, res) => {
    res.send("Hello...");
})

app.listen(process.env.PORT, async () => {
    try {
        await connection;
        console.log("Server is running at port ", process.env.PORT);
    } catch (error) {
        console.log("Something went wrong..", error);
    }
});