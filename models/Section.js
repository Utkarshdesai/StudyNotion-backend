const mongoose = require ('mongoose') 

const SectionSchema = new mongoose.Schema({
    sectiontitle : {
        type:String ,
        required : true
    } ,

    Subsection : [
        {
            type : mongoose.Schema.Types.ObjectId , 
            ref : " Subsection"
        }
    ]
})

module.exports = mongoose.model ('Section' , SectionSchema )