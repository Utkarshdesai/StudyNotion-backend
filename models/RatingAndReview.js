const mongoose = require ('mongoose') 

const RatingAndReviewSchema = new mongoose.Schema({
    User : {
        type: String , 
        required : true
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