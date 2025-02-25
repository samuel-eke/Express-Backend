const userDB = {
    users: require("../model/users.json"),
    setUsers: function (data) { this.users = data }
}
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const fsPromises = require('fs').promises;
const path = require('path')

const handleUserLogin = async (req, resp) => {
    const { user, pword } = req.body;
    if (!user || !pword) return resp.status(400).json({ "Message": "Username and password was not received" });
    //confirm if user exists
    const foundUser = userDB.users.find(person => person.username === user);
    if (!foundUser) { return resp.sendStatus(401) }
    //evaluate the password
    const userMatch = await bcrypt.compare(pword, foundUser.password)
    if (userMatch) {
        const accessToken = jwt.sign(
            { "username": foundUser.username },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '90s' }
        );
        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        const otherUsers = userDB.users.filter(person => person.username !== foundUser.username);
        const currentUser = { ...foundUser, refreshToken }
        userDB.setUsers([...otherUsers, currentUser]);

        await fsPromises.writeFile(
            path.join(__dirname, '..', 'model', 'users.json'),
            JSON.stringify(userDB.users)
        );
        resp.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });

        console.log(refreshToken);

        return resp.status(200).json({
            success: true,
            accessToken
        });
    } else {
        resp.sendStatus(401)
    }
}

module.exports = { handleUserLogin }