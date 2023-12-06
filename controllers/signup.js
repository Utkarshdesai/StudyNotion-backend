//import models 
const otp = require('../models/OTP') ;
const user = require ('../models/Userdetail') 
const otpGenerator = require('otp-generator')
const bcrypt = require("bcrypt")


exports.signup = async(req, res) => {
    try { 

        // fetch user details 
   
         const {firstname,lastname , email , phonenumber, password , confirmpassword , Accounttype ,otp} = req.body ;

        //validations- check empty field 
        if( !firstname || !lastname || !email ||!phonenumber || !password  ||!confirmpassword  ||!Accounttype || !otp) 
        {
             return res.status(200).json({
                message : "fill all the details carefully"
            })
        }

        //password validations 
        if(password !== confirmpassword) 
        {
          return res.status(201).json({
            message:"password not match check once again"
          })
        }

        //check for existing user 
        const existinguser = await user.findOne({email})
        if(existinguser) 
        {
            return res.status(200).json({
                sucess:false ,
                message:"you are already registered"
            })
        }
 
        // fetch recent otp from db 
        const recentotp = await otp.find({email}).sort({createdAt:-1}).limit(1); 
        console.log(recentotp)
        

        //vefify otp 
        if(otp !== recentotp) 
        {
            return res.status(201).json({
                sucess:false , 
                message:"otp is not match try again"
            })
        }  


        //hashed password
        const hashedpassword = bcrypt.hash(password ,10 , ()=> { 
            console.log("password is hashed")
        })

        //additinal details and image
        const additionaldetail = {
              Profession:null ,   
              dateofbirth :null ,
              Gender : null ,
              About : null ,
           
        }
        
        //create entry in databases
        const createuser = await user.create({ 
            firstname ,
            lastname,
            email,
            password : hashedpassword,
            phonenumber,
            Accounttype ,
            additionaldetail ,
            //check it once again
            image : `https://api.dicebear.com/5.x/initials/svg?seed=${firstname}${lastName}`
            // create image and link 

        })

        //send sucessfull respone 
        res.status(200).json({
            sucess:true ,
            data : createuser,
            message:"user is registred in database sucessfully",
          
        })
    
        
    } catch (error) {
        res.status(201).json({
            sucess:false ,
            message:"error while creating entry of user",
          
        })
    }
}