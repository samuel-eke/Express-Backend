const userDB = {
    users: require("../model/users.json"),
    setUsers: function (data) { this.users = data }
}
const bcrypt = require("bcrypt");

const handleUserLogin = async (req, resp) => {
    const { user, pword } = req.body;
    if (!user || !pword) return resp.status(400).json({ "Message": "Username and password was not received" });
    //confirm if user exists
    const foundUser = userDB.users.find(person => person.username === user);
    if (!foundUser) { return resp.sendStatus(401) }
    //evaluate the password
    const userMatch = await bcrypt.compare(pword, foundUser.password)
    if (userMatch) {
        return resp.status(201).json({ "message": `User ${user} logged in successfully` });
    } else {
        resp.sendStatus(401)
    }
}

module.exports = { handleUserLogin }