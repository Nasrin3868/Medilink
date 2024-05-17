const userModel=require("../model/usermodel")
const { hashedPass,comparePass }=require("../helper/hashPassword")
const { generateMail }=require("../helper/generateOtp")
const usercollection=require("../model/usermodel")
const jwt=require('jsonwebtoken')




const registerUser=async(req,res)=>{
    console.log('register in userside')
    try {
        console.log('register in userside')
        const {firstname,lastname,email,password}=req.body
        const user=await userModel.findOne({email})
        console.log('user==null', user==null)
        console.log('register in userside afterrrr/......')

        if(user==null){
            console.log( "verify otp" )
            const hashed_password = await hashedPass(password);
            console.log('password:',password)
            console.log('hashed_password:',hashed_password)
            const otp=await generateMail(email)
            console.log("otp:",otp)
            const userdata=await usercollection.create({
                firstName:firstname,
                lastName:lastname,
                email:email,
                password:hashed_password,
                otp:otp,
                otp_update_time:new Date()
            })
            res.status(201).json({ message: "verify otp..." });
        }else{
            console.log("Email Already Exists")
            res.status(400).json({ message: "Email Already Exists" });

        }
    }catch (error) {
        console.log('register in userside error')
        res.status(500).json({ message: "Server side error" });
        console.log(error.message);
    }
}

const resendOtp=async(req,res)=>{
    try{
        const {email}=req.body
        console.log('email:',email)
        const otp=await generateMail(email)
        const userdata=await usercollection.findOneAndUpdate(
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
        if(userdata){
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
        const userdata=await usercollection.findOne({email:email})
        console.log(userdata)
        if(userdata.otp!==Number(otp)){
            res.status(404).json({message: 'Incorrect OTP'})
        }else{
            const otpExpiryMinute=59
            otpExpirySecond = otpExpiryMinute * 60
            // checking the timer
            const timeDifference=Math.floor((new Date()-userdata.otp_update_time)/1000)
            console.log('new date() in otp:',new Date())
            console.log('userdata.otp_update_time in otp:',userdata.otp_update_time)
            console.log('timeDifference in otp:',timeDifference)
            if(timeDifference>otpExpirySecond){
                console.log('otp expired')
                res.status(400).json({message:'Otp Expired'})
            }else{
                userdata.is_verified=true
                await userdata.save()
                res.status(201).json({message:'Account verified successfully.'})
            }
        }
    }catch(error){
        res.status(500).json({message:"Internal server error"})
    }
}

const userLogin=async(req,res)=>{
    try{
        const {email,password}=req.body
        console.log("email,password:",email,password)
        const userdata=await usercollection.findOne({email:email})
        console.log('userdata:',userdata)
        if(userdata){
            const password_match=await comparePass(password,userdata.password)
            console.log('password_match:',password_match)
            if(password_match){
                if(userdata.blocked){
                    res.status(401).json({message:"Your account is blocked by Admin"})
                }else{
                    console.log('unblocked user')
                    const data={
                        userId:userdata._id
                    }
                    const accessToken=jwt.sign(data,process.env.JWT_ACCESS_TOKEN)
                    const accessedUser={
                        firstName:userdata.firstName,
                        lastName:userdata.lastName,
                        email:userdata.email,
                        role:userdata.role
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
        const userdata=await usercollection.findOne({email:email})
        if(userdata){
            const otp=await generateMail(email)
            userdata.otp=otp
            userdata.otp_update_time=new Date()
            await userdata.save()
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
        const userdata=await usercollection.findOneAndUpdate(
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

module.exports={registerUser,resendOtp,verifyOtp,userLogin,verifyEmail,updatePassword}