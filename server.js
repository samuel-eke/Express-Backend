const express = require("express");
const app = express();
const path = require('path')
const PORT = process.env.PORT || 3500;
const { logger } = require("./middleware/logger")
const cors = require('cors');
const errHandler = require('./middleware/errorHandler')

app.use(logger);

const whitelist = ['https://www.thewebsitedomain.com', 'http://devwebsite:portnumber', 'http://localhost:3500', 'https://claude.ai'];
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('This domain blocked by CORS'));
        }
    },
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));
app.use('/subdir', express.static(path.join(__dirname, '/public')));
app.use('/employees', require("./routes/api/employees"));
app.use('/subdir', require("./routes/subdir"));
app.use('/', require("./routes/root"));
app.use(errHandler);


app.listen(PORT, () => console.log(`The server is running on port http://localhost/${PORT}`))