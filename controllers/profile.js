const user = require("../models/Userdetail")
const profiledetail = require ("../models/Profile")

exports.updateprofile = async (req,res) => { 
    try {

        //get profile details 
        const {Profession ,dateofbirth , Gender , About, profileId} = req.body 

        //validations 
        if(!Profession || !dateofbirth ||!Gender ||!About || !profileId) 
        {
            return res.json({
                message : "fill all the profile details carefully"
            })
        }

        // update profile 
        const editedprofile = await profiledetail.findOneAndUpdate({profileId} , 
            {Profession ,
            dateofbirth,
            Gender,
            About  
            },

            {new:true}) 

        //SEND response 
        res.status(200).json({
            sucess : true ,
            data : editedprofile ,
            message :"profile updated sucessfully"
        })

        //update user 
        const updateuser = await user.findByIdAndUpdate()

        
    } catch (error) {
        
    }

}

