const userDB = {
    users: require("../model/users.json"),
    setUsers: function (data) { this.users = data }
}
const fsPromises = require("fs").promises;
const path = require("path");

const handleLogout = async (req, res) => {
    //on client delete access token

    // Check if refresh token exists in cookies
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);  //no content to send back
    const refreshToken = cookies.jwt;

    //is refresh in DB
    const foundUser = userDB.users.find(person => person.refreshToken === refreshToken);
    if (!foundUser) {
        res.clearCookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 })
        return res.sendStatus(204); // Forbidden
    }

    //delete the refresh token in db

    const otherUsers = userDB.users.filter(person => person.refreshToken !== foundUser.refreshToken);
    const currentUser = { ...foundUser, refreshToken: '' };
    userDB.setUsers([...otherUsers, currentUser]);
    await fsPromises.writeFile(
        path.join(__dirname, '..', 'model', 'users.json'),
        JSON.stringify(userDB.users)
    );
    res.clearCookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: false, maxAge: 24 * 60 * 60 * 1000 })
    return res.sendStatus(204);
}

module.exports = { handleLogout }