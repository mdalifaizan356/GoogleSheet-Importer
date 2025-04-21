import otpModel from "../models/otpModel.js";

const verifyOTP = async(req, res, next) => {
    try {
        const {Email, OTP} = req.body
        const databaseOTP = await otpModel.findOne({Email});
        const matchOTP = databaseOTP.OTP == OTP;
        if(!matchOTP){
        return res.status(400).json({message: `Invalid OTP`});
        }
        req.user ={ userData, Email }
        next();
    }
    catch (error) {    
        return res.status(500).json({message: `Internal Server Error ${error}`});
    }
};

export default verifyOTP;