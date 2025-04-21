import taskModel from "../models/taskModel.js";
import axios from "axios";
import csv from "csv-parser"
import { Readable } from "stream";

const taskController ={
// Create Task
    createTask: async(req, res)=>{
        try {
            const {id} = req.user;    
            const {Title, Description, DueDate} = req.body;

            const duplicateTask = await taskModel.findOne({UserId :id ,Title: Title});

            if(duplicateTask){
            return res.status(400).json({ message: "Task Already Exist" });

            }

            const newTask = new taskModel({
                UserId: id,
                Title,
                Description,
                DueDate
            })
            await newTask.save();
            return res.status(200).json({ message: "Add Task Successfully" });
        }
        catch (error) {
            return res.status(500).json({message: `Internal Server Error ${error}`});
        }
    },



//Get All Task
    allTasks: async(req, res)=>{
        try {
            const {id} = req.user;    
            const tasks = await taskModel.find({UserId:id});
            return res.status(200).json({ message: "Add Task Successfully", tasks:tasks });
        }
        catch (error) {
            return res.status(500).json({message: `Internal Server Error ${error}`});
        }
    },

//Get All Task
    singleTask: async(req, res)=>{
        try {
            const {taskId} = req.params
            const task = await taskModel.findById(taskId);
            return res.status(200).json({ message: "Add Task Successfully", task: task });
        }
        catch (error) {
            return res.status(500).json({message: `Internal Server Error ${error}`});
        }
    },

    
//Delete Task
deleteTask: async(req, res)=>{
        try {
            const {taskId} = req.params;
            await taskModel.findByIdAndDelete(taskId);
            return res.status(200).json({ message: "Task Delete Successfully"});
        }
        catch (error) {
            return res.status(500).json({message: `Internal Server Error ${error}`});
        }
    },



//Change Status
    changeStatus: async (req, res) => {
        try {
        const { taskId } = req.params;

        const task = await taskModel.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        const newStatus = task.Status === 'Complete' ? 'Incomplete' : 'Complete';

        task.Status = newStatus;
        await task.save();
    
        return res.status(200).json({ message: 'Status Changed successfully', Status: newStatus });
    
        } catch (error) {
        return res.status(500).json({ message: `Internal Server Error: ${error.message}` });
        }
    },

//update Task
    updateTask: async (req, res) => {
        try {
        const { taskId } = req.params;
        const { Title, Description, DueDate } = req.body;
        const updatedTask = await taskModel.findByIdAndUpdate(taskId, {Title, Description, DueDate},);
        return res.status(200).json({ message: "Task Updated Successfully", task: updatedTask });
        }
        catch (error) {
        return res.status(500).json({ message: `Internal Server Error: ${error.message}` });
        }
    },

//Import link data
    importData: async (req, res) => {            
    try {
        const { id } = req.user;
        const { sheetUrl } = req.body;
        const match = sheetUrl.match(/\/d\/(.*?)\//);
        if (!match) return res.status(400).send('Invalid sheet URL');
    
        const sheetId = match[1];
        const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;
    
        const response = await axios.get(csvUrl);
        const csvData = response.data;
    
        const rows = [];
        const stream = Readable.from([csvData]);
    
        stream.pipe(csv())
            .on('data', (data) => rows.push(data))
            .on('end', async () => {
            const tasksWithUserId = rows.map(row => ({
                ...row,
                UserId: id,
            }));
    
            await taskModel.insertMany(tasksWithUserId);
            res.send({ message: 'Data imported successfully', count: tasksWithUserId.length });
            });
    
        } catch (error) {
        console.error(error);
        res.status(500).send('Failed to import data');
        }
  },
  
};
export default  taskController;






