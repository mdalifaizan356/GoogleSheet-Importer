import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const email = process.env.email;
const pass = process.env. pass;

const transporter = nodemailer.createTransport(
    {
        secure:true,
        host:'smtp.gmail.com',
        port:465,
        auth:{
            user:email,
            pass:pass
        }
    }
)

const sendMail=(to, sub, msg)=>{
    transporter.sendMail({
        to:to,
        subject:sub,
        html:msg
    });
    console.log("Email Sent");
}
 export default sendMail;