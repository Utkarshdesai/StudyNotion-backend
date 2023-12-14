const mongoose = require ('mongoose') 

const RatingAndReviewSchema = new mongoose.Schema({
    User : {
        type:mongoose.Schema.Types.ObjectId ,
        required :true , 
        ref : "Userdetail"
    },

    Review :{
        type : String ,
        required : true
    },

    Rating : {
        type : String ,
        required :true
    }
})

module.exports = mongoose.model ('RatingAndReview' , RatingAndReviewSchema)