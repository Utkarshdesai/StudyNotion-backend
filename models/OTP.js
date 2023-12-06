const mongoose = require ('mongoose') 
const mailsender = require('../utlis/sendmail')

const OTPSchema = new mongoose.Schema({
    email : {
        type: String , 
        required : true
    },

    crratedAT :{
        type : Date ,
        default : Date.now(),
        exists: 5*60 ,
      },

    otp : {
        type : String ,
        required :true
    }

    

})

//send verfication mail 
//Todo - Check for parametre and asny await

async function verifymail ()
 {
    try {
        
    const mailresponce  = mailsender() 

    console.log("email send sucessfully")


    }

     catch (error) {
        console.log(error) 
        console.log("error while sending verification mail")
    }
 }



//send email before creating entry of model into database by using pre hook
OTPSchema.pre('save' , function(next) {
    verifymail()
    next()
})

module.exports = mongoose.model ('OTP' , OTPSchema)