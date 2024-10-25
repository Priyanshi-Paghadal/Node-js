// const jwt = require("jsonwebtoken");

// const verifyToken = (req, res, next) => {
//     try {
//         const authToken = req.cookies.authToken;
//         console.log(authToken, "token from login");
//         if (!authToken) {
//             return res.redirect("/auth/loginData");
//         }
//         jwt.verify(authToken, "node", (err, decoded) => {
//             if (err) {
//                 return res.status(401).json({ msg: "Unauthorized Access" });
//             }
//             req.user = decoded;
//             next();
//         });
//     } catch (error) {
//         return res.status(401).json({ msg: "Something went wrong" });
//     }
// };

// module.exports = verifyToken;

const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    try {
        const authToken = req.cookies.authToken;
        console.log(authToken);
        if (authToken) {
            jwt.verify(authToken, "node", (err, decoded) => {
                if (!err) {
                    req.user = decoded;
                    next();
                }
                else {
                    return res.status(401).json({ msg: "User Not Authorized" });
                }
            })
        }
        else {
            return res.redirect("/auth/loginData");
        }
    } catch (error) {
        console.log("Something went wrong..", error);
    }
}

module.exports = verifyToken;