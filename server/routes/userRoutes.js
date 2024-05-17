

const express=require("express")
const usercontroller=require("../controller/usercontroller")

const router=express.Router()

router.post('/userRegister',usercontroller.registerUser)
router.post('/resendOtp',usercontroller.resendOtp)
router.post('/verifyOtp',usercontroller.verifyOtp)
router.post('/login',usercontroller.userLogin)
router.post('/verifyEmail',usercontroller.verifyEmail)
router.post('/updatePassword',usercontroller.updatePassword)


module.exports=router