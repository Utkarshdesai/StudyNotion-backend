const User = require("../models/Userdetail") 
const otp = require ('../models/OTP')

exports.sendOTP = async(req ,res) => { 

    try { 

    //fetch email from user 
    const email = req.body.email 

    //check for already register user 
    const checkforlogin = await User.findOne({email}) 

    if (checkforlogin) 
    {
        return res.status(201).json({
            sucess : false ,
            message : "you are already register"
        })
    }

    //generate OTP 
     const otppass = otpGenerator.generate(6, 
        {upperCaseAlphabets: false, 
        specialChars: false , 
        number: false }); 

        console.log(otppass)  

    //create entry in database 
    const saveotp = await otp.findOneAndUpdate({email : email , otp : otppass} ,{new:true}) 
    console.log(saveotp) 

    //send response 
    res.status(200).json({
        sucess : true,
        message : "otp is sent sucessfully"
    })
        

    } catch (error) {
        res.status(200).json({
            sucess : false,
            message : "error while generating otp and saving in database"
        })
            
    }   

}