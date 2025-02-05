const express = require("express");
const path = require("path")
const router = express.Router();


router.get("/", (req, resp) => {
    resp.sendFile(path.join(__dirname, '..', 'views', "index.html"));
})


router.get('/new-page(.html)?', (req, resp) => {
    resp.sendFile(path.join(__dirname, '..', 'views', 'new-page.html'));
})

router.get('/oldpage(.html)?', (req, resp) => {
    resp.redirect('/new-page');
});

router.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, '..', 'views', '404.html'))
});

module.exports = router;