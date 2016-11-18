var express = require("express"),
    courses = require('./courses'),
    router = express.Router(),
    path = require("path");


// pages
router.get("/", getIndex);


// rest
router.post('/auth', Auth);
router.get("/rest/courses", courses.getAll);
router.get("/rest/courses/:id", courses.getById);
router.put("/rest/courses", courses.create);
router.post("/rest/courses", courses.updateById);
router.delete("/rest/courses/:id", courses.removeById);


// helper functions
function getIndex(req, res) {
    res.sendFile(path.join(__dirname + '/../public/index.html'))
}

function Auth(req, res) {
    var login = req.body.login,
        password = req.body.password;
    if (req.body.login === "login" && req.body.password === "password") {
        res.json({auth: true})
    } else {
        res.json({auth: false})
    }
}

module.exports = router;