const course = require("../models/Userdetail")

exports.getallcourse = async(req , res) => {
    try {
    //get courses
    const Getcourse = await course.find() 

    //send respose 
    res.status(200).json({
        sucess:true ,
        data : Getcourse ,
        message : "all the courses get sucessfully"
    })
    } catch (error) {

    res.status(201).json({
        sucess:false,
        message : "error while fetching courses"
    })
    }
   
   
}