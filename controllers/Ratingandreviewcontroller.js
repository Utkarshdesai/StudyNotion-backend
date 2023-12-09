const ratingandreview = require ("../models/RatingAndReview") 
const course = require("../models/Courses") 
const RatingAndReview = require("../models/RatingAndReview")

exports.createRating = async (req ,res) =>{ 
    try {
   //get data 
    const { Review , Rating ,courseId} = req.body 

   //get user id 
   const userid = req.user.id 

   //validation 
   if(! Review || !Rating ||!courseId || !userid) 
   {
     res.json({
        message : "check empty fields"
     })
   }
   //do not allow user to review which is not enrolled 
   const enrolledstudent = await course.findById()

   //check user is alreday given rating 
   const alreadyratating = await ratingandreview.findById({user :userid , course : courseId})

    if(alreadyratating) 
    {
        res.json({
            message:"user is already give rating to this course"
        })
    }

   //create entry 
    const updatecourse = await RatingAndReview.create ( {Rating, Review , User: userid})

   //update course populate 
    

   //send respose 
    res.status(200).json({
        sucess : true ,
        data : updatecourse ,
        message:"rating created sucessfully"
    })
    
        
    } catch (error) { 

        res.status(401).json({
            message : "error occur while crating rating "
        })
        
    }
 
}

exports.Avgrating = async (req ,res) => {

}