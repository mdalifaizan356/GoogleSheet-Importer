import mongoose from "mongoose";
const otpSchema = new mongoose.Schema({
    Email:{
        type:String,
        required:true,
        trim:true,
    },
    OTP:{
        type:String,
        required:true,
        trim:true,
        default:"",
    }, 
},
{
    versionKey:false,
    timestamps:true
}
);

const otpModel = mongoose.model('otp', otpSchema);

export default otpModel;