var routeHelper = require("../helpers/route"),
    CourseModel = require("../models/course"),
    courseRoute = routeHelper(CourseModel);

module.exports = courseRoute;