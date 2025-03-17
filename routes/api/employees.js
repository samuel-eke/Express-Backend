const express = require('express')
const router = express.Router();
const {
    getEveryEmployee, updateEmployee, addNewEmployee, firedEmployee, pickOneEmployee
} = require("../../controllers/employeeController");
const ROLES = require("../../config/roles_list");
const verifyAllRoles = require("../../middleware/verifyRoles")

router.route('/')
    .get(getEveryEmployee)
    .post(verifyAllRoles(ROLES.Admin, ROLES.Editor), addNewEmployee)
    .put(verifyAllRoles(ROLES.Admin, ROLES.Editor), updateEmployee)
    .delete(verifyAllRoles(ROLES.Admin), firedEmployee);

router.route("/:id")
    .get(pickOneEmployee);

module.exports = router;