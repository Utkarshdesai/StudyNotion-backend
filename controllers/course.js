//import models 
const course = require ("../models/Courses")
const user = require("../models/Userdetail")
const category = require ('../models/Category')
exports.createcourse = async (req , res) => {
    try {
        //fetch course details 
        const { title , description ,  price , Whatyouwilllearn , Instructor , RatingAndReview ,categoryid} = req.body 

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
           // add secure url link 
           Thumbnail
        })

        //send response 
        res.status(200).json({
            sucess :true ,
            date : CreateCourse,
            message:"course created sucessfully"
        })

        //update category 
        const insertcourseto_category = await category.findById({_id : categoryid } ,
                                                                {
                                                                   $push : {
                                                                    course : CreateCourse._id
                                                                   } 
                                                                }).populate("Courses").exec()


        } catch (error) {
            return res.status(500).json( {
                message: "error while creating course "
            })
        }
}

//update course 
exports.updatecourse = async (req ,res) => { 
     
   //get data from req 
   const {title , description ,  price , Whatyouwilllearn , Instructor , RatingAndReview ,courseid ,categoryid} = req.body 

   //file fetch 
   const Thumbnail = req.files.Thumbnailfile 

   //validations 
   if (!title || !description || !price
    || !Whatyouwilllearn  || !Instructor 
    || !RatingAndReview ||!Thumbnail) 
    {
       return res.status(201).json({
           message : "please fill All the course details"
       })
    }

    //update course 
    const updatecourse = await course.findByIdAndUpdate({_id :courseid} ,
                                                        {title,
                                                        description,
                                                        price,
                                                        Whatyouwilllearn,
                                                        Instructor,
                                                        RatingAndReview ,
                                                        Thumbnail} ,
                                                        {new:true})  

    //update category 
    const newcatgory = await category.findByIdAndUpdate({_id : categoryid} ,
                                                        {
                                                            $push : {course : updatecourse._id}
                                                        },
                                                        {new:true}).populate("course").exec()

}


//delete course 
exports.deletecourse = async (req,res) => {
    
    //get course id
    const {courseid ,categoryid} = req.body 

    //check valid course 
    if(!courseid) 
    {
        return res.json({
            message:"course id not match"
        })
    }
   
    //delete course 
   const deletecourse = await course.findByIdAndDelete({_id : courseid})

   console.log(deletecourse) 

   //delete course from category 
   const removecourse = await category.findByIdAndDelete({_id : categoryid},
                                                          {
                                                            $pull : {  course : courseid}
                                                          },
                                                          {new:true}).populate("course").exec() 
    
}

//get course
exports.getAllcourse = async (req,res) => {
    try {
        
        //get important properties
        const getallcourse = await course.find({}, {price:true ,
             RatingAndReview:true ,Instructor:true , title:true , description:true})

        //send response
        res.status(200).json({
            sucess:true ,
            data:getallcourse,
            message:"get all courses"
        })
       
    } catch (error) {
        res.status(400).json({
            sucess:false ,
            message:"error while getting course"
        })

    }
}

exports.getcoursedetail = async (req,res) => {
    try {

        //get course id
        const courseid = req.body 

        //validations 
        if(!courseid) 
        {
            return res.status(404).json({
                message:"course id is not valid"
            })
        }

        //get course detail
        const coursedetail = await course.findById({_id:courseid}).populate
                             (" category").populate("RatingAndReview").populate("coursecontent").exec()

        //send response 
        res.status(200).json({
            sucess:true ,
            data:coursedetail,
            message:"get course details specific to course"
        })

        
    } catch (error) {
        res.status(400).json({
            sucess:false ,
            message:"error while getting deatail of course"
        }) 
    }
}

   