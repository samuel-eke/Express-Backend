// const userDB = {
//     users: require("../model/users.json"),
//     setUsers: function (data) { this.users = data }
// }
// const jwt = require("jsonwebtoken");
// require('dotenv').config();

// const handleRefreshToken = (req, resp) => {
//     const cookies = req.cookies
//     console.log(req.cookies)
//     if (!cookies?.jwt) return resp.sendStatus(401); // No cookie, unauthorized

//     const refreshToken = cookies.jwt;
//     console.log(refreshToken);

//     const foundUser = userDB.users.find(person => person.refreshToken === refreshToken);
//     if (!foundUser) return resp.sendStatus(403); // Forbidden

//     // evaluate jwt
//     jwt.verify(
//         refreshToken,
//         process.env.REFRESH_TOKEN_SECRET,
//         (err, decodedToken) => {
//             if (err || foundUser.username !== decodedToken.username) return resp.sendStatus(403);
//             const accessToken = jwt.sign(
//                 { "username": decodedToken.username },
//                 process.env.ACCESS_TOKEN_SECRET,
//                 { expiresIn: '90s' }
//             );
//             resp.json({ accessToken })
//         }
//     );
// }

// module.exports = { handleRefreshToken }

const userDB = {
    users: require("../model/users.json"),
    setUsers: function (data) { this.users = data }
}
const jwt = require("jsonwebtoken");


const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;

    // Check if refresh token exists in cookies
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    // Find user with matching refresh token
    const foundUser = userDB.users.find(person => person.refreshToken === refreshToken);
    if (!foundUser) return res.sendStatus(403); // Forbidden

    // Verify refresh token
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.username !== decoded.username) {
                return res.sendStatus(403);
            }
            const roles = Object.values(foundUser.roles);
            // Generate new access token
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": decoded.username,
                        "roles": roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '90s' }
            );

            res.json({ accessToken });
        }
    );
}

module.exports = { handleRefreshToken }