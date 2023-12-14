const user = require("../models/Userdetail")
const profiledetail = require ("../models/Profile")

exports.updateprofile = async (req,res) => { 
    try {

        //get profile details 
        const {Profession , dateofbirth , Gender , About, profileId} = req.body 
        const userid = req.user.id

        //validations 
        if(!Profession || !dateofbirth ||!Gender ||!About || !profileId || !userid) 
        {
            return res.json({
                message : "fill all the profile details carefully"
            })
        }

        // update profile 
        const editedprofile = await profiledetail.findOneAndUpdate({_id : profileId} , 
            {Profession ,
            dateofbirth,
            Gender,
            About  
            },

            {new:true}) 

      


        //update profile in user 
        const update_additionaldetails = await user.findByIdAndUpdate ( {_id :userid} , 
                                                                       {$push : {additionaldetail : editedprofile.id}} ,
                                                                       {new :true}).populate("Profile").exec()

        console.log(update_additionaldetails)

        //SEND response 
        res.status(200).json({
            sucess : true ,
            data : editedprofile ,
            message :"profile updated sucessfully"
        })

           
    } catch (error) {
        res.status(40).json({
            sucess : false ,
            message :"profile not updated"
        })
    }

}

    // exports.deleteprofile = async (req ,res) => {
      
    // }


    // exports.updatedisplaypic = async (req,res) => {
    //    //get pic from req 

    //    //validations 
    //    //upload it to cloudinary 
    //    //update profile
    //    //send response 
    // }

    exports.getAlluserdetail = async (req,res) => { 
       try { 
        
        //get user id
        const userid =req.user.id  

        //get user detail 
        const userdetails = await user.find({}).populate("additionaldetail").exec() 

        //send response 
        res.status(200).json({
            sucess:true,
            data:userdetails, 
            message:"all details are fetch sucessfully"
        })
        
       } catch (error) {
          
        res.status(400).json({
            sucess:false,
            message:"error while getting userdetails"
        })

       }
     

    }
