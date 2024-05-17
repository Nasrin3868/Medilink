const express=require("express")
const doctorController=require('../controller/doctorcontroller')

const router=express.Router()

// router.post('/docRegister',doctorController.registerUser)
// router.post('/resendOtp',doctorController.resendOtp)
// router.post('/verifyOtp',doctorController.verifyOtp)
// router.post('/login',doctorController.userLogin)
router.post('/verifyEmail',doctorController.verifyEmail)
router.post('/updatePassword',doctorController.updatePassword)


module.exports=router