import express from "express";
import authController from "../Controllers/authController.js";
import distributeOTP from '../utilities/distributeOTP.js';

const router = express.Router();

router.post("/sendotp", distributeOTP);
router.post("/signup", authController.signUp);
router.post("/login", authController.login);
router.post("/resetpass", authController.resetPass);


export default router; 