const express = require("express");
const path = require("path")
const router = express.Router();

router.get("/", (req, resp) => {
    resp.sendFile(path.join(__dirname, '..', 'public', "file 1.html"));
})

router.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, '..', 'views', '404.html'))
});

module.exports = router;