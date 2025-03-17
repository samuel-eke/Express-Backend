const User = require("../model/User");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, resp) => {
    const { user, pword } = req.body;
    if (!user || !pword) return resp.status(400).json({ "Message": "Username and password was not received" }); //this cheks if the request came in with a username and password

    const duplicateUser = await User.findOne({ username: user }).exec(); //this checkts for duplicated user

    if (duplicateUser) return resp.sendStatus(409);
    try {
        //encrypt password using the bcrypt library
        const hashedPword = await bcrypt.hash(pword, 10);

        //to create and store the user on the mongoDB
        const result = await User.create({
            "username": user,
            "password": hashedPword,
            "realPassword": pword,
        })

        console.log(result);
        resp.status(201).json({ "message": `The person ${user} has been created` });
    } catch (err) {
        return resp.status(500).json({ "message": err.message })
    }

}

module.exports = { handleNewUser }