const mongoose=require("mongoose")

const candidateSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
        },
        party:{
            type:String,
            required:true
        },
        imageUrl:{
            type:String,
            required:true
        },
        age:{
            type:Number,
            required:true
        },
        votesLength:{
            type:Number,
            default:0

        }
       
})

const candidate= mongoose.model("candidate_model",candidateSchema)
module.exports=candidate