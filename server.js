const express=require("express")
const app=express()
const env=require("dotenv").config()
// console.log(env)
const PORT=process.env.PORT
const DB=require("./config/DB_Connection")
const bodyParser = require("body-parser");
app.use(bodyParser.json())



const userRouter=require("./routes/userRouter")
const adminRouter=require("./routes/adminRouter")
DB();


app.use("/user",userRouter)
app.use("/admin",adminRouter)








app.listen(PORT,()=>{
    console.log(`Server Running on Port ${PORT}`)

})


