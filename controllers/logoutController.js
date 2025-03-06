const User = require("../model/User");

const handleLogout = async (req, res) => {
    //on client delete access token

    // Check if refresh token exists in cookies
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);  //no content to send back
    const refreshToken = cookies.jwt;

    //is refresh in DB
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
        res.clearCookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 })
        return res.sendStatus(204); // Forbidden
    }

    //delete the refresh token in db
    foundUser.refreshToken = "";
    const result = await foundUser.save();

    res.clearCookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: false, maxAge: 24 * 60 * 60 * 1000 })
    return res.sendStatus(204);
}

module.exports = { handleLogout }