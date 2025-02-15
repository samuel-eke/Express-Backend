const express = require('express');
const router = express.Router();
const loginUser = require("../controllers/theLoginController");

router.post('/', loginUser.handleUserLogin);

module.exports = router;