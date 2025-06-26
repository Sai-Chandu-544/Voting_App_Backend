const express=require("express")
const router=express.Router();
const {userRegister,userLogin,getList,castVote}=require("../controllers/userLogic")
const middleware=require("../middleware/middleware")


router.post("/register",userRegister)
router.post("/login",userLogin)
router.get("/list",middleware,getList)
router.post("/castVote",middleware,castVote)


module.exports=router;