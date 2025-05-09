require('dotenv').config();
const express = require("express");
const app = express();
const path = require('path')
const PORT = process.env.PORT || 3501;
const cors = require('cors');
const corsOptions = require('./config/corsConfig');
const veriftyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConnect.js")

connectDB();
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

app.use("/logout", require("./routes/logout"));
app.use("/signup", require("./routes/register"));
app.use("/login", require("./routes/loginUser"));
app.use("/refresh", require("./routes/refresh"))

app.use('/employees', veriftyJWT, require("./routes/api/employees"));
app.use('/', require("./routes/root"));

mongoose.connection.once('open', () => {
    console.log("DB connected");

    app.listen(PORT, () => console.log(`The server is running on port http://localhost/${PORT}`))
})
