import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:5,
        max:20
    },
    username:{
        type:String,
        required:true,
        unique:true,
        min:5,
        max:20
    },
    password:{
        type:String,
        required:true,
        min:5,
        max:20
    }
});

const User = new mongoose.model("user",userSchema);

export default User;