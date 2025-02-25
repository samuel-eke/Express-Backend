const express = require("express");
const app = express();
const path = require('path')
const PORT = process.env.PORT || 3501;
const { logger } = require("./middleware/logger")
const cors = require('cors');
const errHandler = require('./middleware/errorHandler');
const corsOptions = require('./config/corsConfig');
const veriftyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");

app.use(logger);
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
app.use(errHandler);


app.listen(PORT, () => console.log(`The server is running on port http://localhost/${PORT}`))