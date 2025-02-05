const { logEvents } = require("./logger")

const errHandler = function (err, req, res, next) { //nc
    logEvents(`${err.name}:\t ${err.message}`, 'errorLogs.txt');
    console.error(err.stack);
    res.status(500).send(err.message);
}

module.exports = errHandler;