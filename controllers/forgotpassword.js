
//import pacakages
const mailsender = require('../utlis/sendmail')
const user = require('../models/Userdetail')
const bcrypt = require("bcrypt");
const Userdetail = require('../models/Userdetail');


//reset token 
const sendUIlink = async(req,res) => {
  try {

    //fetch email from request 
    const email = req.body.email ;

    //check for existing user 
    const checkexistinguser = await user.findOne(email) 

    if(checkexistinguser) 
    {
        return res.status(201).json({
            sucess:"false" ,
            message :"you are already LOG IN"
        })
    }

    //create a token 
    let resettoken = crypto.randomUUID();
    console.log(resettoken); 
 
    //create url with this token 
    let url = `http://localhost:3000/forgotpassword/${resettoken}`
    console.log(url)

    //update user by adding token and expiration time 
     const updatedetails = await user.findByIdAndUpdate({email} , 
                         {token :resettoken , 
                         resettokenexpire : Date.now() + 5*60*1000 } ,
                         {new:true})
   

    //send mail 
     const sendmail = mailsender(email , `password reset link ${url}`) 
     console.log(sendmail)
    
    
    res.status(200).json({
        sucess:"true",
        date : updatedetails ,
        message:"email send sucessfully check link to reset password"
    })



    } catch (error) {
        res.status(201).json({
            message : "error while sending forgot password link"
        })
    }
        
    } 


//resetpassword 
const resetpassword = async(req ,res) => {

    try {

    // fetch details from UI 
    const {resettoken , newpassword ,confirmnewpassword} = req.body ;

    //verify password 
    if(newpassword !== confirmnewpassword) 
    {
        return res.status(201).json({
            sucess : false ,
            message:"password not match"
        })
    } 

    //get userdetails from db using token 
    const getuserdetail  = await user.findOne({token : resettoken}) 

    //check if user not found 
    if (!getuserdetail) 
    {
        return res.status(201).json({
            message :"token is invalid"
        })
    }

    //check token expiration time 
    if (Userdetail.resettokenexpire < Date.now()) 
    {
        return res.json({
            message : "token is expire , regenrate token again "
        })
    }


    //hased password 
    const updatedpassword = bcrypt.hash(newpassword ,10 , ()=> { 
        console.log("password is hashed")
    })

    //update password in db 
    const updatepassword = await user.findOneAndUpdate({email} , {password : updatedpassword} ,{new :true}) 

    //send respose 
    res.status(200).json({
        sucess : true ,
        data : updatepassword,
        message:"password updated sucessfully"
    })
        
    } catch (error) {
        res.status(201).json({
            sucess : false ,
            message:"error while reseting password"
        })
    }

   
}

module.exports = { sendUIlink , resetpassword }