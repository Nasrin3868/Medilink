const mongoose = require("mongoose");

const doctorschema=new mongoose.Schema({
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
    mobileno:{
        type:Number,
        required: true
    },
    specialization:{
        type:String,
        required: true
    },
    curr_work_hosp:{
        type: String,
        require:true
    },
    experience:{
        type:String,
        required: true
    },
    consult_fee:{
        type:Number,
        required: true
    },
    certificates:{
        qualification:[
            {
                type: String,
                required:true
            }
        ],
        experience:[
            {
                type: String,
                required:true
            }
        ],
    },
    liscence:{
        type: String,
        required:true
    },
    identity_proof_type:{
        type: String,
        required:true
    },
    identity_proof_image:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required: true,
    },
    is_verified:{
        type: String,
        default: false
    },
    blocked:{
        type: Boolean,
       default : false
    },
    created_time:{
        type: Date,
        default: Date.now()
    },
    otp:{
        type: Number,
        required:true
    },
    otp_update_time:{
        type: Date,
        default:Date.now()
    },
    
});

module.exports = mongoose.model("doctorcollection", doctorschema);