const section = require("../models/Section") 
const course = require("../models/Courses")

//create section 
exports.createsection = async (req ,res ) => {
  try {

    //fetch details 
    const { sectiontitle , courseID} = req.body 

    //validations 
    if(!sectiontitle || !courseID) 
    {
        return res.status(201).json({
            message : "check any empty field"
        })
    }

    //create entry in db 
    const Createsection = await section.create(sectiontitle) 

    //update course content 
    const updatecourse = await course.findByIdAndUpdate ( {courseID} , 
                                                           {
                                                              $push : {
                                                                coursecontent : Createsection._id ,   
                                                                       }
                                                           } ,
                                                           {new: true})

    // send response 
    res.status(200).json({
        sucess:true ,
        data :updatecourse ,
        message:"section created sucessfully"
    })
  

    } catch (error) {
    
        return res.status(201).json({
            sucess : false ,
            message : "error while creating section"
        })
        
    }
    }

//update section 
exports.updatesection = async (req ,res) =>{
    try {

    //get new data 
    const {sectiontitle , sectionId} = req.body 

    //validations 
    if(!sectiontitle || !sectionId) 
    {
        return res.json({
            message : "please check all the fields"
        })
    }

    //update section 
    const Updatesection = await section.findByIdAndUpdate({sectionId} , {sectiontitle} , {new:true}) 

    //update course 
        
    } catch (error) {
        return res.status(201).json({
            sucess : false ,
            message : "error while updating section"
        })
    }
     
}

//delete section 
exports.deletesection = async (req,res) => { 
    try {
    
    //get id
    const id = req.params.id 

    //delete section 
    const deletesection = await section.findByIdAndDelete(id) 

    //return response 
    res.status(200).json({
        message:"section deleted sucessfully"
    })

    } catch (error) {
        
        return res.status(201).json({
            sucess : false ,
            message : "error while deleteing section"
        })
 


    }

    


}