//import models 
const course = require ("../models/Courses")
const user = require("../models/Userdetail")
exports.createcourse = async (req , res) => {
    try {
        //fetch course details 
        const { title , description ,  price , Whatyouwilllearn , Instructor , RatingAndReview } = req.body 

        //file fetch 
        const Thumbnail = req.files.Thumbnailfile 
        
        //validations - empty field
        if (!title || !description || !price
             || !Whatyouwilllearn  || !Instructor 
             || !RatingAndReview ||!Thumbnail) 
             {
                return res.status(201).json({
                    message : "please fill All the course details"
                })
             }

        //Todo - instructor level validations 

        //todo - upload image to cloundainary 

        //create entry of course in db 
        const CreateCourse = await course.create({
           title,
           description,
           RatingAndReview ,
           Whatyouwilllearn,
           price ,
           Thumbnail
        })

        //

    } catch (error) {
        return res.status(500).json( {
            message: "error while creating course "
          })
    }
}


   