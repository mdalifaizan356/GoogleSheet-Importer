import generateOtp from "./generateOTP.js";
import sendMail from "./sendEmail.js";
import otpModel from "../models/otpModel.js";

const distributeOTP = async(req, res) => {
    try {
        
        const {Email} = req.body; 
        if(!Email){
            return res.status(400).json({message: `Email Is Require`});    
        }
        const OTP = await generateOtp();
        if(OTP){
            sendMail(`${Email}`, "OTP by CP Bags Agency", `${OTP}`);
            console.log(OTP);
        }
        await otpModel.findOneAndUpdate({ Email }, { Email, OTP, createdAt: new Date() }, { upsert: true, new: true });
        return res.status(200).json({message: `OTP send on Email`});
    }
    catch (error) {    
        return res.status(500).json({message: `Internal Server Error ${error}`});
    }
};

export default distributeOTP;