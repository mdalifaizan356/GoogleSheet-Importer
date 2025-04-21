import express from "express";
import userController from "../Controllers/userController.js";
import verifyToken from "../middlewares/tokenVerification.js";

const router = express.Router();
router.patch("/changepass", verifyToken, userController.changePass);


export default router;