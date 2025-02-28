const jwt = require("jsonwebtoken")
 

const veriftyJWT = (req, resp, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;  //new addition
    if (!authHeader?.startsWith("Bearer ")) return resp.sendStatus(401);
    console.log(authHeader);
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decodedToken) => {
            if (err) return resp.sendStatus(403)
            req.user = decodedToken.UserInfo.username;
            req.roles = decodedToken.UserInfo.roles;
            next();
        }
    );
}

module.exports = veriftyJWT;