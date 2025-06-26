const mongoose=require("mongoose")

const voteSchema= new mongoose.Schema({
user: { type: mongoose.Schema.Types.ObjectId, ref: "user_model", unique: true },
candidate: { type: mongoose.Schema.Types.ObjectId, ref: "candidate_model" }


})

const votes=mongoose.model("votes_model",voteSchema)
module.exports=votes