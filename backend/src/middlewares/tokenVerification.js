import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config();
const secretKey =  process.env.SECRETKEY;

const verifyToken = (req, res, next) => {

    try { 
        const token = req.cookies.Token;
        if(!token){
            return res.status(400).json({message: "Access Denied!"});
        }
        const verifyUser = jwt.verify(token, secretKey)
        req.user = verifyUser;
        next();
    }
    catch (error) {    
        return res.status(500).json({message: `Internal Server Error ${error}`});
    }
};

export default verifyToken;