const Subsection = require("../models/Subsection") 
const section = require ("../models/Section")

//create subsection 
exports.createsubsection = async (req, res) => { 
    try {

    //fetch data from request
    const { coursetitle , Description , Timeduration ,sectionid } = req.body 

    // fetch video file 
    const lecturevideo = req.files.videofile 

    //validations 
    if (!coursetitle ||!Description ||!Timeduration ||!sectionid ||!lecturevideo) 
    {
       return res.json ( {
         message : "fill all sub section fields"
       })
    }
    //upload video to cloudinary

    //create entry in db 
     const CreateSubSection = await Subsection.create ( 
        {
            coursetitle ,
            Description,
            Timeduration, 
            //add cloudinary video url
        }
     )

    //update section
    const updatesection = await section.findByIdAndUpdate({sectionid} ,
        {
            $push : {
                Subsection : CreateSubSection._id
            },    
        } ,
        {
            new : true
        })
    
    //send response 
    res.status(200).json({
        sucess : true,
        data : updatesection,
        message : "subsection created sucessfully" 
    })
        
    } catch (error) {
        return res.status(201).json({
            sucess : false ,
            message : "error while creating section"
        })
    }

}

//update subsection 
exports.updatesubsection = async (req ,res) => { 
    try {
    
    //fectch data that need to update from body 
    const {coursetitle , Description , Timeduration , subsectionId } = req.body 

    //get video 
    const newvideo = req.files.updatevideo

    //check for empty field 
    if(!coursetitle || !Description  || !Timeduration  ||!subsectionId || !newvideo )
    { 
       return res.json({
        message : "check for empty fields"
       })      
    }

    //update subsection 
    const updatedsubsection = await Subsection.findByIdAndUpdate({subsectionId} , 

                                                                {
                                                                  coursetitle ,
                                                                  Description,
                                                                  Timeduration,
                                                                  newvideo                                                                        
                                                                },
                                                                
                                                                {
                                                                    new : true
                                                                })

    // send response 
    res.status(200).json({
        sucess: true ,
        data : updatedsubsection ,
        message : "subsection updated suceefully"
    })

        
    } catch (error) {
        return res.status(201).json({
            sucess : false ,
            message : "error while updating section"
        })
    }

} 

//delete subsection
exports.deletesubsection = async (req,res) => {

   // get id
    const id  = req.params.id 

  //validation
  
  //deletesubsection
  const deletesubsection = await Subsection.findByIdAndDelete(id)


   

}

