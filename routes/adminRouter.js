const express=require("express")
const router=express.Router();
const middleware=require("../middleware/middleware")
const {adminRegister,adminLogin,add_candidate,allVotes}=require("../controllers/adminLogic")


router.post("/register",adminRegister)
router.post("/login",adminLogin)

router.post("/addCandidate",middleware,add_candidate)
router.get("/allVotes",middleware,allVotes)



module.exports=router;