const express = require('express')
const router = express.Router();
const {
    getEveryEmployee, updateEmployee, addNewEmployee, firedEmployee, pickOneEmployee
} = require("../../controllers/employeeController");
const veriftyJWT = require("../../middleware/verifyJWT")

router.route('/')
    .get(veriftyJWT, getEveryEmployee)
    .post(addNewEmployee)
    .put(updateEmployee)
    .delete(firedEmployee);

router.route("/:id")
    .get(pickOneEmployee);

module.exports = router;