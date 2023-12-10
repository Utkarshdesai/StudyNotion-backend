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
                                                           {new: true}).populate("Section").exec()

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
    const {sectiontitle , sectionId ,courseID} = req.body 

    //validations 
    if(!sectiontitle || !sectionId ||!courseID ) 
    {
        return res.json({
            message : "please check all the fields"
        })
    }

    //update section 
    const Updatesection = await section.findByIdAndUpdate({_id : sectionId} , 
                                                          {sectiontitle : sectiontitle} ,
                                                          {new:true}) 

    //update course 
    const updateCourse = await course.findByIdAndUpdate ( {_id : courseID} ,
                                                           {$push : {coursecontent : Updatesection._id}} ,
                                                            {new:true}).populate("Section").exec()
    
    console.log(updateCourse)

        
    //send response 
      res.status(200).json({
        sucess:true ,
        message:"section updated sucessfully",
        date :Updatesection ,
      })


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
    const sectionid = req.params
    const {courseid} = req.body

    //delete section 
    const deletesection = await section.findByIdAndDelete( {_id : sectionid }) 

    if(!deletesection) 
    {
        res.json({
            message:"section is not deleted"
        })
    }
    
    //delete section from course
    const updatecourse = await course.findByIdAndDelete({_id : courseid} , 
                                                         {
                                                            $pull : 
                                                            {
                                                              coursecontent : sectionid
                                                            }
                                                         },
                                                          {new :true} 
                                                         ).populate("coursecontent").exec()

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