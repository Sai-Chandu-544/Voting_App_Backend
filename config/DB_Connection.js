const express=require("express")
const app=express()
const mongoose=require("mongoose")
const env=require("dotenv").config()
// console.log(env)
app.use(express.json())
const MONGO_URL=process.env.MONGO_URL
// console.log(MONGO_URL)
const DB=async()=>{
    try{
        
         const connection= await mongoose.connect(MONGO_URL)
         if(!connection){
            console.log("Database Connection Failed")

         }else{
            console.log("Database Connected Successfully")
         }

    }catch(err){
        console.log(err)
       
        }
    }
   




module.exports=DB;