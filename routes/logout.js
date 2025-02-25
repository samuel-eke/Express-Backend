const express = require('express');
const router = express.Router();
const userlogout = require("../controllers/logoutController");

router.get("/", userlogout.handleLogout)

module.exports = router;