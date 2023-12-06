//import packages and models 
const user = require('../models/Userdetail') 
const JWT = require('jsonwebtoken') 
const bcrypt = require('bcrypt')

exports.loginuser = async(req ,res ) => {
  try {
   
    //fetch data from user 
    const {email , password} = req.body 

    //validations 
    if(!email || !password ) 
    {
        return res.status(200).json({
            sucess : false ,
            message : "please fill all login details carefully"
        })
    }

    //check user is register or not 
    const registeruser = await user.findOne({email}) 

    if(!registeruser) 
    {
        return res.status(201).json({
            sucess:false ,
            message: "please signup first ,user is not registred"
        })
    } 

    //if user is register then compare the password 
    if(await bcrypt.compare(password , registeruser.password))
    {
       //payload 
       const payload = {
            email : registeruser.email  ,
            accounttype : registeruser.Accounttype , 
            id : registeruser._id ,
       }
    
       //user is log in create JWT token 
       const jwttoken = JWT.sign(payload , process.env.JWT_key , {expiresIn : "2h"})  

       // add entry of password in database and undefined password
       registeruser.password = undefined ,
       registeruser.token = jwttoken  
       

       // create options for cookie 
        const options = {
            expires: new Date( Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly:true,
        }

  
       //send jwttoken as a res in cookie
       res.cookie("usercookie" ,token ,options).status(200).json({
          sucess:true , 
          registeruser,
          token ,
          message : "user is login sucessfully and JWT token is also created"

       })
    } 
    else
    {
        res.status(201).json({
            sucess:false ,
            message:"password is not match try it again",
          
        })
    }
  

    } catch (error) {
        res.status(201).json({
                sucess:false ,
                message:"error while user login",
            
            })
    }

}