const express = require('express')
const router = express.Router()
const data = {
}
data.employees = require('../../data/employees.json');  //this is simulating a connection to a database to retrieve data.

router.route('/')
    .get((req, resp) => {
        resp.json(data.employees);
    })
    .post((req, resp) => {
        resp.json({
            "firstname": req.body.firstname,
            "lastname": req.body.lastname
        })
    })
    .put((req, resp) => {
        resp.json({
            "firstname": req.body.firstname,
            "lastname": req.body.lastname
        });
    })
    .delete((req, resp) => {
        resp.json({ "id": req.body.id });
    });

router.route("/:id")
    .get((req, resp) => {
        resp.json({ id: req.params.id });
    });

module.exports = router;