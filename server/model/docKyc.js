const mongoose = require("mongoose");

const docKycschema=new mongoose.Schema({
    docId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'doctorcollection', 
        required: true,
    },
    exp_certificate:{
        type: String,
        default: false,
    },
    qualification_certificate:{
        type: String,
        default: false,
    },
    doc_liscence:{
        type: String,
        default: false,
    },
    id_proof:{
        type: String,
        default:false
    },
    specialization:{
        type: String,
        default: false
    },
    curr_work_hosp:{
        type: String,
        default:false
    },
    created_time:{
        type: Date,
        default: Date.now()
    }

    
});

module.exports = mongoose.model("docKyccollection", docKycschema);