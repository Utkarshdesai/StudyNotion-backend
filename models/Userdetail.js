const mongoose = require('mongoose') 

const UserSchema = new mongoose.Schema ({
   firstname : {
      type : String ,
      required: true
   },

   lastname:{
    type : String ,
    required: true
   }, 

   email : {
    type : String ,
    required: true
   },

   phonenumber : {
      type : String ,
      required: true
   },

   password:{
    type : String ,
    required: true
   },

   Accounttype:{
    enum : ["student" , "admin" , "Instructor"] ,
    required: true
   },

   additionaldetail: 
      {
         type: mongoose.Schema.Types.ObjectId ,
         ref : "Profile"
      },
 
   Course : [
      {
         type: mongoose.Schema.Types.ObjectId ,
         ref : "Courses"
      }
   ], 

   CourseProgess : [
      {
         type: mongoose.Schema.Types.ObjectId ,
         ref : "CourseProgess"
      }
   ],

  

})

module.exports = mongoose.model('Userdetail' , UserSchema)