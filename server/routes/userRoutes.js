

const express=require("express")
const usercontroller=require("../controller/usercontroller")

const router=express.Router()

router.post('/userRegister',usercontroller.registerUser)
router.post('/resendOtp',usercontroller.resendOtp)
router.post('/verifyOtp',usercontroller.verifyOtp)

module.exports=router