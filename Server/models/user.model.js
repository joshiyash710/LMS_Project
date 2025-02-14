import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        enum : ['Instructor','Student'],
        default : 'Student'
    },
    enrolledCourses : [
        {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Course'
        }
    ],
    profilePhoto : {
        type : String,
        default : ''
    }
},{timestamps:true})

export const User = mongoose.model("User",userSchema)