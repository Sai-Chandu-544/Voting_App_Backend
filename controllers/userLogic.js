const bcrypt = require("bcrypt");
const userModel = require("../models/user_model");
const candidateModel=require("../models/candidate")
const votesModel=require("../models/votes")
require("dotenv").config();
const jwt=require("jsonwebtoken")

module.exports.userRegister = async (req, res) => {
  try {
    const { name, email, password, gender, age, phoneNo, adhaarNo } = req.body;

    if (!name || !email || !password || !gender || !age || !phoneNo || !adhaarNo) {
      return res.status(401).json({message:"All fields are required"});
    }

    // age = Number(age); // Convert string to number
    
if (age < 18) {
  return res.status(402).json({ message: "Age must be 18 or greater" });
}


    if (phoneNo.length !== 10) {
      return res.status(403).json({message:"Phone Number must be exactly 10 digits"});
    }

    const existingUser = await userModel.findOne({ email:email });
    if (existingUser) {
      return res.status(404).json({message:"User already registered!"});
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      gender,
      age,
      phoneNo,
      adhaarNo
    });

    await newUser.save();
    res.status(200).json({message:"User registered successfully"});

  } catch (err) {
    console.error("User Registration Error", err);
    res.status(500).json({message:"Server Error"});
  }
};

module.exports.userLogin=async (req,res)=>{
    try{
        const {name,email,password}=req.body;
        if(!name ||!email || !password ){
            return res.status(400).json({message:"Feild is Required"})
        }
        
        const user=await userModel.findOne({email:email})
        if(!user){
            return res.status(401).json({message:"Please Register!"})
        }
        if(name!==user.name){
            return res.status(402).json({message:"name is Incorrect"})

        }
       const result= await bcrypt.compare(password,user.password)
      

       if(result){
        const token=jwt.sign({name:user.name,email:user.email,password:user.password},process.env.SECRET_KEY,{expiresIn:"1h"})
        
        console.log("Login Successfull")
        res.json({token,user: {
      _id: user._id,
      name: user.name,
      email: user.email
    }})
        

      }
      else{
        res.json({message:"something went wrong!"})
      }
          
          

    }catch(err){
         console.log("something went wrong",err)
        res.json({
            message: "Something went wrong",
            error: err
          });
          

    }
}
module.exports.getList= async(req,res)=>{
  try{
    const list= await candidateModel.find()
    console.log(list)
    res.status(200).json(list)

  }catch(err){
    console.log("Internal Server Error",err)
    res.status(400).json({message:"Something went Wrong"})

  }
}
module.exports.castVote=async(req,res)=>{
try {
  const { userId, candidateId } = req.body;

  // Get user
  const user = await userModel.findById(userId);
  if (!user) {
    return res.status(400).json({ message: "Please login" });
  }
  

  // Check if user already voted
  const alreadyVoted = await votesModel.findOne({ user: userId });
  if (alreadyVoted) {
    return res.status(401).json({ message: "You have already voted" });
  }

  // Get candidate
  const candidate = await candidateModel.findById(candidateId);
  if (!candidate) {
    return res.status(404).json({ message: "Candidate not found" });
  }

  // Save vote
  const vote = new votesModel({ user: userId, candidate: candidateId });
  await vote.save();

  // Update user status
  user.hasVoted = true;
  await user.save();

  // Increase vote count
  candidate.votesLength += 1;
  await candidate.save();

  res.status(200).json({ message: "Your vote has been cast successfully" });

} catch (err) {
  console.error("Internal Server Problem", err);
  res.status(500).json({ message: "Something went wrong" });
}

 



}