const express = require('express')
const router = express.Router();
const {
    getEveryEmployee, updateEmployee, addNewEmployee, firedEmployee, pickOneEmployee
} = require("../../controllers/employeeController");

router.route('/')
    .get(getEveryEmployee)
    .post(addNewEmployee)
    .put(updateEmployee)
    .delete(firedEmployee);

router.route("/:id")
    .get(pickOneEmployee);

module.exports = router;