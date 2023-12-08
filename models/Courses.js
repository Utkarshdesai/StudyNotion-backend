const mongoose = require ("mongoose") 

const CoursesSchema = new mongoose.Schema ({

    title : {
        type : String ,
        required : true 
    },

    description : {
        type : String ,
        required : true 
    },

     price : {
        type : String ,
        required : true 
    },

     Whatyouwilllearn : {
        type : String ,
        required : true 
    },

     Instructor : {
        type : String ,
        required : true 
    },

    RatingAndReview : [
        {
            type : mongoose.Schema.Types.ObjectId ,
            ref : " RatingAndReview"
        }
    ],

    Tags : [
        {
           type: mongoose.Schema.Types.ObjectId ,
           ref : "Tags"
        }
     ],

     Thumbnail : {
        type : String ,
        required: true 
     },

     coursecontent : [
        {
            
           type: mongoose.Schema.Types.ObjectId ,
           ref : "Section" 
        }
     ],
     studentsEnrolled: [{
        type:mongoose.Schema.Types.ObjectId,
        //required true 
        ref:"User",
    }]


    


})

module.exports = mongoose.model ("Courses" , CoursesSchema)