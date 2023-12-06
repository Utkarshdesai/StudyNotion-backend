//import models 
const tag = require("../models/Tags") 

exports.createtags = async(req, res) => {
    try {
    //fetch all details from body 
    const {name , description} =req.body 

    //validation - check for empty fields 
    if(!name || !description)
    {
        return res.status(404).json( {
          message: "fill all the fields"
        })
    }

    //todo - check user type wrong in postman 

    //create entry in db 
    const Createtag = await tag.create({name , description}) 

     //send response 
     res.status(200).json({
        sucess:true ,
        data :Createtag ,
        message:"tag is created sucessfully in db"
    })



    } catch (error) {
        return res.status(500).json( {
            message: "error while creating tag controller"
          })
    }
   
}

exports.getalltags = async(req,res) => {
   try {
    
    //fetch tags from db 
    const gettags = await tag.find() 

    //send response 
    res.status(200).json({
        sucess:true ,
        data :gettags,
        message:"fetch tags sucessfully"
    })


   } catch (error) {
    return res.status(500).json( {
        message: "error while fetching tags"
      })
   }
}