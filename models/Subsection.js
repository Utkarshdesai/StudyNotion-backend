const mongoose = require ('mongoose') 

const SubsectionSchema = new mongoose.Schema({
    coursetitle : {
        type:String ,
        required : true
    } ,

    Description : {
        type:String ,
        required : true
    } ,

    
    videourl : {
        type:String ,
        required : true
    },

    Timeduration : {
        type:String ,
        required : true
    }, 

    additionalurl : {
        type:String ,
        
    }, 

})

module.exports = mongoose.model ('Subsection' , SubsectionSchema  )