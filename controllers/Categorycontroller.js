//import models 
const category = require("../models/Category") 
const { findById } = require("../models/Courses")

exports.creacategory = async(req, res) => {
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
    const Createcateory = await category.create({name , description}) 

     //send response 
     res.status(200).json({
        sucess:true ,
        data :Createcateory ,
        message:" category is created sucessfully in db"
    })



    } catch (error) {
        return res.status(500).json( {
            message: "error while creating category controller"
          })
    }
   
}

exports.getcategory = async (req,res) => {
   try {

    //fetch tags from db 
    const getcategory = await category.find()  

    if(!getcategory) 
    {
        return res.status(404).json({
            message: "category not found"
        })
    }

    //send response 
    res.status(200).json({
        sucess:true ,
        data :gettags,
        message:"get category details"
    })


   } catch (error) {
    return res.status(500).json( {
        message: "error while fetching category"
      })
   }
}

exports.categorypagedeatils = async (req ,res) => {

    try {

        const {categoryid}  = req.body 

        if(categoryid) 
        {
            return res.json("category not found ")
        }
    
        //get course related to that category 
        const courses = await category.findById( {_id : categoryid}  ).populate("Courses").exec()
        console.log(courses)
    
        //get course which not related to that category 
        const getdifferentcourse = await category.find({_id : {$ne : categoryid}} , {new :true}).populate("Courses").exec()
        console.log(getdifferentcourse)

         //get popular course 

         //send response 
         res.status(200).json({
            sucess :true ,
            message : "categorypage details obtained sucessfully"
         })
    
        
        } catch (error) {
            res.status(404).json({
                sucess :false ,
                message : "category page details not found"
            })
        }

    

   
}