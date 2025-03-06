const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    address: {
        type: String
    }
});

module.exports = mongoose.model('Hire', employeeSchema)