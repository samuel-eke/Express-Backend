const express = require('express')
const router = express.Router();
const {
    getEveryEmployee, updateEmployee, addNewEmployee, firedEmployee, pickOneEmployee
} = require("../../controllers/employeeController");
const veriftyJWT = require("../../middleware/verifyJWT");
const ROLES = require("../../config/roles_list")
const verifyRoles = require("../../middleware/verifyRoles")

router.route('/')
    .get(getEveryEmployee)
    .post(verifyRoles(ROLES.Admin, ROLES.Editor), addNewEmployee)
    .put(verifyRoles(ROLES.Admin, ROLES.Editor), updateEmployee)
    .delete(verifyRoles(ROLES.Admin), firedEmployee);

router.route("/:id")
    .get(pickOneEmployee);

module.exports = router;