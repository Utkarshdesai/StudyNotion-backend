//fetch token
//missing token  
//verify token 
//send response 

//import pacakges 
const JWT =  require("jsonwebtoken") 
require('dotenv').config()


exports.auth = async (req ,res ,next) => { 
    try { 
        //fetch token 
    const gettoken = req.cookies.token || req.body.token 

    //token is not found 
    if(!gettoken) 
    {
        return res.status(401).json({
            sucess : false ,
            message : "token is not found"
        })
    }

    //verify token 
    const decodetoken = JWT.verify (gettoken , process.env.jwt_secrtkey)
    cosnole.log(jwtverify) 

    req.registeruser = decodetoken

    if(!jwtverify) 
    {
        return res.status(201).json({
            sucess:"false" ,
            message:"error while decoding token"
        })
    }

    res.status(200).json({
        sucess:true ,
        data: jwtverify,
        message:"user is authenticate"
    })

    //move to next middleware
    next()

    } catch (error) {

        res.status(200).json({ 
            sucess:false ,
            message:"error while authenticating user"
        })
        
    }

}

exports.isstudent = async (req , res , next) => {
  try {
    
    //check for accounttype of user
    if(req.registeruser.Accounttype !== "student") 
    {
       return res.status(200).json({ 
            sucess:false ,
            message:"welcome to protected route for student "
        })
    } 

    //move to next middleware
    next()



  } catch (error) {
    res.status(200).json({ 
        sucess:false ,
        message:"error while authorization to student "
    })
  }
} 


exports.isInstructor = async (req , res , next) => {
    try {
      
      //check for accounttype of user
      if(req.registeruser.Accounttype !== "Instructor") 
      {
         return res.status(200).json({ 
              sucess:false ,
              message:"welcome to protected route for Instructor "
          })
      } 
  
      //move to next middleware
      next()
  
  
  
    } catch (error) {
      res.status(200).json({ 
          sucess:false ,
          message:"error while authorization to Instructor "
      })
    }
  }