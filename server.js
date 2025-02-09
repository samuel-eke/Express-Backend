const express = require("express");
const app = express();
const path = require('path')
const PORT = process.env.PORT || 3500;
const { logger } = require("./middleware/logger")
const cors = require('cors');
const errHandler = require('./middleware/errorHandler');
const corsOptions = require('./config/corsConfig');

app.use(logger);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

app.use('/employees', require("./routes/api/employees"));

app.use('/', require("./routes/root"));
app.use(errHandler);


app.listen(PORT, () => console.log(`The server is running on port http://localhost/${PORT}`))