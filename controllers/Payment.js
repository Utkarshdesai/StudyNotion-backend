const Razorpay = require('razorpay') 
const user = require("../models/Userdetail")
const course = require ("../models/Courses") 
const instance =require("../config/Razorpay")
const { default: mongoose } = require('mongoose')
const mailsender = require('../utlis/sendmail')

//create order 
exports.capturepayment = async (req ,res) => {
    

    //get course & user ID 
    const {courseid} = req.body 
    const userID = req.user.id  

   //validation check for valid courseid 
   try {
    if(!courseid) 
    {
        return res.status(404).json({
            message:"this is not valid courseID please check it again"
        })
    }


   //check for any valid course exist
   const checkcourse = await course.findById(courseid) 

   if(!checkcourse) 
   {
      res.status(404).json({
        message:"course not exist"
      })
   }

   //check that user is already pay for that course
    const isstudentenrolled = new mongoose.Schema.Types.ObjectId(userID) 
    if(course.studentsEnrolled.includes(isstudentenrolled)) 
    {
        return res.json({
            message : "student are already enrolled into course"
        })
    }

    
    } catch (error) {
        res.json({
            message:"error while course validations"
        })
    }
    

    //crate options 
    try {
    
        const options = {
            Amount : course.price *100 ,
            currency : "INR" ,
            receipts : Date.now(),
            notes : {
    
            }
        }
            
        //create order 
         
        const order = instance.orders.create(options) 
        console.log(order)
    
        //send response
        res.status(200).json({
            sucess :true ,
            message:"order is created" , 
            data : order 
    
    
        })
        

    } catch (error) {
        res.status(200).json({
            sucess :false ,
            message:"error while creating order" , 
            data : order 
        })
        
    }
       
}


//verify signature and server 
exports.authorizedorder = async (req, res) => { 

    //validation of web hooks 
    const webhook = "123" 
    
    //get signature 
    const signature = req.header["x-razorpay-sign"]
    const shasum =  crypto.createHmac("sha256", webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");


    if(webhook === digest) 
    {
        res.json({
            message:"signature is verified"
        })
    }

    //get user and course id 
    const {courseId, userId} = req.body.payload.payment.entity.notes;

    try {
    
    //find a student and update course to it 
    const enrollledcoursetouser = await user.findByIdAndUpdate({userId} ,
                                                                {$push:{Course : courseId}},
                                                                 {new:true}) 

    console.log(enrollledcoursetouser) 

    if(!enrollledcoursetouser)  
    {
        return res.json({
            message:"course is not updated in user account"
        })
    }                                                           

    //studentenroll update 
    const enrolledstudent = await course.findByIdAndUpdate({courseId} ,
                                                           {$push:{studentsEnrolled : userId}},
                                                           {new:true})

    console.log(enrolledstudent)
    
    if(!enrolledstudent) 
    {
        return res.json({
            message:"student is not enrolled to course"
        })
    }

    //mail send  
    const sendpaymentmail = await mailsender("you are enrolled into our course")

    //response send 
    res.status(200).json({
        sucess:true ,
        data:sendpaymentmail ,
        message:"signature is verified and course added sucessfully"
    })

     
    } catch (error) {
        return res.json({
            message:"student is not enrolled to course"
        })
    }

   

  

}

