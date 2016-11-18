var mongoose = require("mongoose"),
    CourseSchema = new mongoose.Schema({
        name: String,
        description: String,
        date: Date,
        duration:String,
        authors: [String]
    }),

    Course = mongoose.model("Course", CourseSchema);

module.exports = Course;
