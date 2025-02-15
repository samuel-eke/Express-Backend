const express = require('express');
const router = express.Router();
const theRegisterController = require("../controllers/registerController");

router.post("/", theRegisterController.handleNewUser)

module.exports = router;