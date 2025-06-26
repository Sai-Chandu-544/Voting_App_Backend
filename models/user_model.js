const mongoose=require("mongoose")

const user_schema= new mongoose.Schema({

    name:{
        type:String,
        requried:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        enum:["male","female","others"]

    },
    age:{
        type:Number,
        required:true

    },
    phoneNo:{
        type:String,
        required:true
    },
    adhaarNo:{
        type:Number,
        required:true,

    },
    hasVoted:{
        type:Boolean,
        default:false,
        required:true
    }


})

const user_model=mongoose.model("user_model",user_schema)
module.exports=user_model;