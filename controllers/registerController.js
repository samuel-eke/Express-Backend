const userDB = {
    users: require("../model/users.json"),
    setUsers: function (data) { this.users = data }
}
const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, resp) => {
    const { user, pword } = req.body;
    if (!user || !pword) return resp.status(400).json({ "Message": "Username and password was not received" }); //this cheks if the request came in with a username and password
    const duplicateUser = userDB.users.find(person => person.username == user); //this checkts for duplicated user

    if (duplicateUser) return resp.sendStatus(409);

    try {
        //encrypt password using the bcrypt library
        const hashedPword = await bcrypt.hash(pword, 10);

        //to store the user on the mockdb
        const newUser = { "username": user, "password": hashedPword, "realPassword": pword }
        userDB.setUsers([...userDB.users, newUser]);

        await fsPromises.writeFile(
            path.join(__dirname, "..", "model", "users.json"),
            JSON.stringify(userDB.users)
        );
        resp.status(201).json({ "message": `The person ${user} has been created` });
        console.log(userDB.users);
    } catch (err) {
        return resp.status(500).json({ "message": err.message })
    }

}

module.exports = { handleNewUser }