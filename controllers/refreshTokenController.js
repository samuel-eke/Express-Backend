const User = require("../model/User");
const jwt = require("jsonwebtoken");


const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;

    // Check if refresh token exists in cookies
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    // Find user with matching refresh token
    const foundUser = await User.findOne({ refreshToken }).exec();

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