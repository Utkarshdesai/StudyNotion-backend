const mongoose = require ('mongoose') 

const CourseProgessSchema = new mongoose.Schema({

    courseID : [
        {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "Courses"
        }
    ] ,

    completedvideos : [
        {
            type: String ,
            ref : "Subsection"
        }
    ],
 
})

module.exports = mongoose.model ('CourseProgess' , CourseProgessSchema )

