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
        }).populate("Subsection").exec()
    
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
    const {coursetitle , Description , Timeduration , subsectionId ,sectionid } = req.body 

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
    const updatedsubsection = await Subsection.findByIdAndUpdate({ _id : subsectionId} , 

                                                                {
                                                                  coursetitle ,
                                                                  Description,
                                                                  Timeduration,
                                                                  newvideo                                                                        
                                                                },
                                                                
                                                                {
                                                                    new : true
                                                                })

    //update section 
    const newsection = await section.findByIdAndUpdate ({_id : sectionid} ,
                                                        {$push:{Subsection : updatedsubsection._id}},
                                                        {new:true}).populate("Subsection").exec() 

    console.log(newsection)
                                                                
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
    try {
  
    //get id
    const {sectionid ,subsectionid}  = req.body
 
   //validation
   if(!sectionid || subsectionid ) 
   {
      return res.status(404).json({
         message:"Id not found"
      })
   }
   
   //deletesubsection
   const deletesubsection = await Subsection.findByIdAndDelete( {_id : subsectionid })
   console.log(deletesubsection)

   if (!deletesection )
   {
     res.status(404).json({
        message :"sub section is not deleted"
     })
   }
 
 
   //delete subsection from section 
   const deletesection = await section.findByIdAndDelete({_id : sectionid} ,{$pull : {Subsection : subsectionid}})
   
   //check if subsection from section is not deleted 
   if (!deletesection)
   {
     res.json({
        message : "sub section from section is not deleted"
     })
   } 

   res.status(200).json({
     sucesss  :true ,
     data : deletesubsection ,
     message:"sub section is deleted sucessfully"
   })


        
    } catch (error) {
        
        res.status(400).json({
            sucesss  :false,
             message:"sub section is Not deleted"
        })
    }

   
   

}

