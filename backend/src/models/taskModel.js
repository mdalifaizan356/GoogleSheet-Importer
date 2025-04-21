import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    UserId:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "users",
        required: true 
    },
    Title:{
        type: String,
    },
    Description:{
        type: String,
    },
    DueDate:{
        type: Date,
    },
    Status:{
        type: String,
        enum:["Incomplete", "Complete"],
        default: "Incomplete"
    }
},
{
    versionKey:false,
    timestamps:true
}

);

const taskmodel = mongoose.model("task", taskSchema);

export default taskmodel;