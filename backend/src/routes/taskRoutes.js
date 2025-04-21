import express from "express";
import taskController from "../controllers/taskController.js";


const router = express.Router();
 
router.post("/createtask", taskController.createTask);
router.get("/alltasks", taskController.allTasks);
router.get("/singletask/:taskId", taskController.singleTask);
router.delete("/deletetask/:taskId", taskController.deleteTask);
router.patch("/changestatus/:taskId", taskController.changeStatus);
router.put("/updatetask/:taskId", taskController.updateTask);
router.post("/importdata", taskController.importData);

export default router;