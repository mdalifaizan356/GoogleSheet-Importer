import express from "express";
import taskController from "../controllers/taskController.js";
import verifyToken from "../middlewares/tokenVerification.js";



const router = express.Router();
 
router.post("/createtask", verifyToken,  taskController.createTask);
router.get("/alltasks", verifyToken, taskController.allTasks);
router.get("/singletask/:taskId", verifyToken, taskController.singleTask);
router.delete("/deletetask/:taskId", verifyToken, taskController.deleteTask);
router.patch("/changestatus/:taskId", verifyToken , taskController.changeStatus);
router.put("/updatetask/:taskId", verifyToken, taskController.updateTask);
router.post("/importdata", verifyToken, taskController.importData);

export default router;