const express = require("express");
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();

app.set("view engine", "ejs");

const port = 5555;

app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 500 } }));
app.use(flash());

app.get('/flash', function (req, res) {
    req.flash('info', 'Flash is back!');
    res.redirect('/');
});

app.get('/', function (req, res) {
    res.render('index', { messages: req.flash('info') });
});

app.listen(port, () => {
    console.log("Server is running at port ", port);
});