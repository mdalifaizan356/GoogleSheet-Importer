import userModel from "../models/userModel.js";
import otpModel from "../models/otpModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secretKey =  process.env.SECRETKEY;

const authController ={
//SignUp
    signUp: async (req, res)=>{ 
        try {
            const { Name, Email, Password, OTP} = req.body;

            const userOTP = await otpModel.findOne({Email});
            if(userOTP){
                const compareOTP = userOTP.OTP == OTP;
                if(!compareOTP){
                    return res.status(400).json({ Email, message: "Invalid OTP" });
                }
            }
            const existingUser = await userModel.findOne({ Email });
            if (existingUser) return res.status(400).json({ message: "Email already registered!" });
            const hashedPassword = await bcrypt.hash(Password, 10);
            const newUser = new userModel({ Name, Email, Password: hashedPassword });
            await newUser.save();
            res.status(200).json({message: "User registered successfully!", SupplierId: supplierId });
          }
          catch (error) {
            console.error("Signup Error:", error);
            res.status(500).json({ message: "Internal Server Error" });
          }
    },

    
 // Login
    login:async(req, res)=>{
        try {
            const {Email, Password} = req.body;
            const user = await userModel.findOne({Email});
            if(!user){
                return res.status(400).json({message: "Email Not Ragistered.!"});
            }
            const userRole = user.Role;
            const currectPass = user.Password;
            const matchPass = await bcrypt.compare(Password, currectPass);
            if(!matchPass){
                return res.status(400).json({message: "Invalid Credentials!"});
            }
            const token = jwt.sign({id: user._id, email: user.Email, role: user.Role }, secretKey, {expiresIn:"1h"})
            res.cookie("Token", token, {
                httpOnly: true,
                sameSite: "Strict",
                maxAge: 60 * 60 * 1000,
            });
            return res.status(200).json({token, userRole, message: "Login Successfully!"});
        }
        catch (error) {
            return res.status(500).json({message: `Internal Server Error ${error}`});
        }
    },

 // ResetPassword
    resetPass:async(req, res)=>{
        try {
            const {Email, OTP, NewPassword} = req.body;
            const userOTP = await otpModel.findOne({Email});
            if(userOTP.OTP !==OTP){
                    return res.status(400).json({message:"Invalid OTP"})
            }
            const existingUser = await userModel.findOne({Email});
            if(!existingUser){
                return res.status(400).json({message:"Email Not Registered"});
            }
            const hashedPassword = await bcrypt.hash(NewPassword, 10);
            await userModel.findOneAndUpdate({Email}, {Password:hashedPassword});
            return res.status(200).json({message:"Reset Password Successfully"});
        }
        catch (error) {
            return res.status(500).json({message: `Internal Server Error ${error}`});
        }
    },
}

export default  authController;


