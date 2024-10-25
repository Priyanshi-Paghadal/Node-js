const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    try {
        const authToken = req.cookies.authToken;
        console.log(authToken, "token from login");
        if (!authToken) {
            return res.redirect("/adminRoutes/login");
        }
        jwt.verify(authToken, "node", (err, decoded) => {
            if (err) {
                res.status(403).json({ msg: "Unauthorized Access" });
            }
            req.user = decoded;
            next();
        })
    } catch (error) {
        res.status(401).json({ msg: "Something went wrong" });
    }
}

module.exports = verifyToken;