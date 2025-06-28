const bcrypt = require("bcrypt");
const adminModel = require("../models/admin_model");
const candidateModel=require("../models/candidate")
const votesModel=require("../models/votes")
require("dotenv").config();
const jwt=require("jsonwebtoken")


module.exports.adminRegister=async(req,res)=>{
    try{
         const { name, email, password } = req.body;
        
            if (!name || !email || !password) {
              return res.status(400).send("All fields are required");
            }
        
        
            const existingAdmin = await adminModel.findOne({ email:email });
            if (existingAdmin) {
              return res.status(401).send("admin already registered!");
            }
        
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
        
            const newadmin = new adminModel({
              name,
              email,
              password: hashedPassword,
             
            });
        
            await newadmin.save();
            res.status(200).send("admin registered successfully");

    }catch(err){

    }
}

module.exports.adminLogin=async (req,res)=>{
    try{
        const {name,email,password}=req.body;
        if(!name ||!email || !password ){
            return res.status(400).json({message:"Feild is Required"})
        }
        
        const admin=await adminModel.findOne({email:email})
        if(!admin){
            return res.status(401).json({message:"Please Register!"})
        }
        if(name!==admin.name){
            return res.status(402).json({message:"name is Incorrect"})

        }
       const result= await bcrypt.compare(password,admin.password)
      

       if(result){
        const token=jwt.sign({name:admin.name,email:admin.email,password:admin.password},process.env.SECRET_KEY,{expiresIn:"1h"})
        
        console.log("Login Successfull")
        res.json({token,admin: {
      _id: admin._id,
      name: admin.name,
      email: admin.email
    }})
        

      }
      else{
        res.status(500).json({message:"something went wrong!"})
      }
          
          

    }catch(err){
         console.log("something went wrong",err)
        res.status(502).json({
            message: "Something went wrong",
            error: err
          });
          

    }
}
module.exports.add_candidate=async(req,res)=>{
  try{
    const {name,party,imageUrl,age}=req.body;

    const partyExists = await candidateModel.findOne({ party: party });

if (partyExists) {
  return res.status(400).json({ message: "Party name should not be duplicate" });
}

    const addCandidate=  new candidateModel({
      name,party,imageUrl,age

    }) 
    await addCandidate.save()
    res.status(201).json({
      message: 'Candidate added successfully', 
      candidate: addCandidate });


  }catch(err){
    console.error('Error adding candidate:', err);
    res.status(500).json({ message: 'Server error' });

  }
    
}
module.exports.allVotes=async(req,res)=>{
  try{
    const allVotes= await votesModel.find().select("-user") // this excludes the 'user' field
    .populate("candidate", "name party votesLength");
    res.status(200).json(allVotes)

  }catch(err){
    console.log("Internal Server Problem",err)
    res.status(500).json({message:"Something went wrong",
      error:err
    })

  }
}