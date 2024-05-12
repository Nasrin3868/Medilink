const userModel=require("../model/usermodel")
const { hashedPass,comparePass }=require("../helper/hashPassword")
const { generateMail }=require("../helper/generateOtp")
const usercollection=require("../model/usermodel")




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
                otp_updated_time:new Date()
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
        const {email,otp}=req.body
        const userdata=await usercollection.findOne({email:email})
        if(userdata.otp!==Number(otp)){
            res.status(404).json({message: 'Incorrect OTP'})
        }else{
            const otpExpirySecond=59
            // checking the timer
            const timeDifference=Math.floor((new Date()-userdata.otp_update_time)/1000)

            if(timeDifference>otpExpirySecond){
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
        const userdata=await usercollection.findOne({email:email})
        if(userdata){
            const password_match=await comparePass(password,userdata.password)
            if(password_match){
                if(userdata.blocked){
                    res.status(401).json({message:"Your account is blocked by Admin"})
                }else{

                    //create jsom web token
                    res.status(201).json({message:"Your account is not blocked by Admin"})
                }
            }
        }else{
            res.status(401).json({message:"Invalid username"})
        }
        
    }catch(error){
        res.status(500).json({message:"Internal server error"})
    }
}


module.exports={registerUser,resendOtp,verifyOtp}