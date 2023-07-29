import mongoose, { mongo } from "mongoose";
import bcrypt from 'bcryptjs'


const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    number:{
        type:String,
        required:true,
        unique: true
    }
}, {
    timestamps:true
});


const User = mongoose.model('User', userSchema);
export default User;