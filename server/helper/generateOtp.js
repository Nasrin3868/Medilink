const nodemailer = require("nodemailer");

const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const generateMail = async (email) => {
  const otp = generateOtp();
    console.log("otp:",otp)

  let transpoter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: 'nasrinkichlu3868@gmail.com',
      pass: 'vyhf yfwi zpqe rrhx',
    },
  });

  const mailOptions = {
    from: "nasrinkichlu3868@gmail.com",
    to: email,
    subject: "OTP for Verification",
    text: `Your OTP from MentorCode application: ${otp}`,
  };

  console.log('mailoptions:',mailOptions);

  return new Promise((resolve,reject)=>{
   transpoter.sendMail(mailOptions,(err,info)=>{
        console.log('get into return')
      if(err){
        console.log("error while generating otp");
         reject(err.message)
      }else{
        console.log('generated otp for registration:',otp)
         resolve(otp)
      }
   })
  })
};

module.exports = {
  generateMail,
};
