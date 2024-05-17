const doctorcollection=require('../model/doctormodel')
const { hashedPass,comparePass }=require("../helper/hashPassword")
const { generateMail }=require("../helper/generateOtp")



const resendOtp=async(req,res)=>{
    try{
        const {email}=req.body
        console.log('email:',email)
        const otp=await generateMail(email)
        const doctordata=await doctorcollection.findOneAndUpdate(
            {
                email:email
            },
            {
                $set:{
                    otp:otp
                },
                $currentDate:{
                    otp_update_time:true
                }
            }
        )
        if(doctordata){
            res.status(201).json({ message: "Successfully send a new OTP" });
        }else{
            res.status(404).json({ message: "User not found" });
        }
    }catch(error){
        res.status(500).json({message:"Internal server error"})
    }
}

const verifyOtp=async(req,res)=>{
    try{
        console.log(req.body.email,req.body.otp)
        const {email,otp}=req.body
        const doctordata=await doctorcollection.findOne({email:email})
        console.log(doctordata)
        if(doctordata.otp!==Number(otp)){
            res.status(404).json({message: 'Incorrect OTP'})
        }else{
            const otpExpiryMinute=59
            otpExpirySecond = otpExpiryMinute * 60
            // checking the timer
            const timeDifference=Math.floor((new Date()-doctordata.otp_update_time)/1000)
            console.log('new date() in otp:',new Date())
            console.log('userdata.otp_update_time in otp:',doctordata.otp_update_time)
            console.log('timeDifference in otp:',timeDifference)
            if(timeDifference>otpExpirySecond){
                console.log('otp expired')
                res.status(400).json({message:'Otp Expired'})
            }else{
                doctordata.is_verified=true
                await doctordata.save()
                res.status(201).json({message:'Account verified successfully.'})
            }
        }
    }catch(error){
        res.status(500).json({message:"Internal server error"})
    }
}

const doctorLogin=async(req,res)=>{
    try{
        const {email,password}=req.body
        console.log("email,password:",email,password)
        const doctordata=await doctorcollection.findOne({email:email})
        console.log('doctordata:',doctordata)
        if(doctordata){
            const password_match=await comparePass(password,userdata.password)
            console.log('password_match:',password_match)
            if(password_match){
                if(doctordata.blocked){
                    res.status(401).json({message:"Your account is blocked by Admin"})
                }else{
                    console.log('unblocked user')
                    const data={
                        doctorId:doctordata._id
                    }
                    const accessToken=jwt.sign(data,process.env.JWT_ACCESS_TOKEN)
                    const accessedUser={
                        firstName:doctordata.firstName,
                        lastName:doctordata.lastName,
                        email:doctordata.email,
                        role:doctordata.role
                    }
                    console.log('accesstoken:',accessToken)
                    console.log('accessedUser:',accessedUser)
                    res.status(201).json({
                        accessToken,
                        accessedUser,
                        message:"Login successfully"
                    })
                }
            }else{
                res.status(401).json({message:"Incorrect password"})
            }
        }else{
            res.status(401).json({message:"Invalid username"})
        }
        
    }catch(error){
        res.status(500).json({message:"Internal server error"})
    }
}

//verify email for forget password
const verifyEmail=async(req,res)=>{
    try{
        const {email}=req.body
        const doctordata=await doctorcollection.findOne({email:email})
        if(userdata){
            const otp=await generateMail(email)
            doctordata.otp=otp
            doctordata.otp_update_time=new Date()
            await doctordata.save()
            res.status(201).json({message:'Email verification done'})
        }else{
            res.status(401).json({message:"Invalid Email"})
        }
    }catch(error){
        res.status(500).json({message:"Internal server error"})
    }
}

const updatePassword=async(req,res)=>{
    try{
        const {email,password}=req.body
        const hashed_password = await hashedPass(password);
        const doctordata=await doctorcollection.findOneAndUpdate(
            {email:email},
            {$set:
                {
                    password:hashed_password
                }
            }
        )
        res.status(201).json({message:"Password Updated"})
    }catch(error){
        res.status(500).json({message:"Internal server error"})
    }
}

module.exports={resendOtp,verifyOtp,doctorLogin,verifyEmail,updatePassword}