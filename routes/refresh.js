const express = require('express');
const router = express.Router();
const refreshuser = require("../controllers/refreshTokenController");

router.get("/", refreshuser.handleRefreshToken)

module.exports = router;