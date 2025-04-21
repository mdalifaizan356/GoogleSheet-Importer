import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import taskRoutes from "./routes/taskRoutes.js"
import { connectDB } from "./lib/db_connection.js";

dotenv.config();

const app = express();
const port = process.env.PORT;
const host = process.env.HOST

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(
    cors({
      // origin: process.env.CLIENT_URL,
      origin: "http://localhost:5173",
      methods: "GET,POST,PUT,PATCH,DELETE",
      credentials: true,
    })
  );

app.use("/taskroutes", taskRoutes);

app.listen(port, host, ()=>{
    console.log(`Server is runnig on Port Number ${port}`);
    connectDB();
});