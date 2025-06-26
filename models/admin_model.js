const mongoose=require("mongoose")

const admin_schema= new mongoose.Schema({

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
    }
   

})

const admin_model=mongoose.model("admin_model",admin_schema)
module.exports=admin_model;