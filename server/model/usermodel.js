const mongoose = require("mongoose");

const userschema=new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type: String,
        required: true,
    },
    otp:{
        type: Number,
        required:true
    },
    otp_update_time:{
        type: Date,
        default:Date.now()
    },
    is_verified:{
        type:Boolean,
        default:false
    },
    role:{
        type: String,
        default:'user'
    },
    blocked:{
        type: Boolean,
        default : false
    },
    created_time:{
        type: Date,
        default: Date.now()
    }
    
});

module.exports = mongoose.model("usercollection", userschema);