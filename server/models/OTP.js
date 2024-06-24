 const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

const OTPSchema = new mongoose.Schema({
    email:{
        type:String,
        required: true,
    },
    otp: {
        type:String,
        required:true,
    },
    createdAt: {
        type:Date,
        default:Date.now(),
        expires: 5*60,
    }
});


//a function -> to send emails
async function sendVerificationEmail(email, otp) {
    try{
        const mailResponse = await mailSender(email, "Verification Email from SmartStudy", otp);
        console.log("Email sent Successfully: ", mailResponse);
    }
    catch(error) {
        console.log("error occured while sending mails: ", error);
        throw error;
    }
}

//pre middleware-> this should run before saving of the user in db 
OTPSchema.pre("save", async function(next) {
    await sendVerificationEmail(this.email, this.otp);
    next();//hey my job is done! now head on to the next middleware
}) 



module.exports = mongoose.model("OTP", OTPSchema);

