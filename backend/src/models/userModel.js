import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
      trim: true,
    },
    Email: {
      type: String,
      required: true,
      trim: true,
    },
    Password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const userModel = mongoose.model("users", userSchema);
export default userModel;
