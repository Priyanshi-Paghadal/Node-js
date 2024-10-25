const express = require("express");
const app = express();

const connection = require("./connection/db");
const port = 9898;

const ejs = require("ejs");
var passport = require('passport');
var session = require('express-session');

const LocalStrategy = require("passport-local");
const userModel = require("./model/model.auth");

app.use(express.json());
const bcrypt = require("bcrypt");
app.set("view engine", "ejs");

app.use(session({
    secret: "any long secret key",
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());

app.use(passport.session());

passport.use(
    new LocalStrategy(async (username, password, done) => {
        console.log(username, password, "auth")
        try {
            const user = await userModel.findOne({ username })
            console.log(user);
            if (!user) {
                return done(null, false, { message: "incorrect username" })
            }
            const isValid = await bcrypt.compare(password, user.password);
            if (!isValid) {
                return done(null, false, { message: "incorrect password" });
            }

            return done(null, user);

        } catch (error) {
            return done(error)
        }
    })
)

passport.serializeUser((user, done) => {
    done(null, user.id) // store the userid into session
})

passport.deserializeUser(async (id, done) => {
    try {
        const user = await userModel.findById(id);
        done(null, user)

    } catch (error) {
        done(null, false)
    }
})
const authRoutes = require("./route/route.auth");
app.use("/auth", authRoutes);

app.listen(port, async () => {
    try {
        await connection;
        console.log("Server` is running at port ", port);
    } catch (error) {
        console.log(error);
    }
})