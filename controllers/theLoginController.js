const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const handleUserLogin = async (req, resp) => {
    const { user, pword } = req.body;
    if (!user || !pword) return resp.status(400).json({ "Message": "Username and password was not received" });
    //confirm if user exists
    const foundUser = await User.findOne({ username: user }).exec();

    if (!foundUser) { return resp.sendStatus(401) }
    //evaluate the password
    const userMatch = await bcrypt.compare(pword, foundUser.password)
    if (userMatch) {
        const roles = Object.values(foundUser.roles)
        const accessToken = jwt.sign(  //new addition
            {
                "UserInfo": {
                    "username": foundUser.username,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '5m' }
        );
        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();

        resp.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: false, maxAge: 24 * 60 * 60 * 1000 });

        console.log();

        return resp.status(200).json({
            success: true,
            accessToken,
            "message": "Yo, u logged in, init mate"
        });
    } else {
        resp.sendStatus(401)
    }
}

module.exports = { handleUserLogin }