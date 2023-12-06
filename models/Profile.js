const mongoose = require('mongoose')

const ProfileSchema = new mongoose.Schema({
   Profession:{
     type:String ,
     required : true
   },

   dateofbirth :{
    type:String ,
    required : true
   },

   Gender : {
    type:String ,
    required : true
   },

   About : {
    type:String ,
    required : true
   } 


})

module.exports = mongoose.model('Profile' , ProfileSchema)