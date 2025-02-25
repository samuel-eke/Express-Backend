const jwt = require("jsonwebtoken")
require("dotenv").config()

const veriftyJWT = (req, resp, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return resp.sendStatus(401);
    console.log(authHeader);
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decodedToken) => {
            if (err) return resp.sendStatus(403)
            req.user = decodedToken.username;
            next();
        }
    );
}

module.exports = veriftyJWT;