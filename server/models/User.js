const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type:String,
        required:true,
        trim:true,
    },
    lastName :{
        type:String,
        required:true,
        trim:true,
    },
    email: {
        type:String,
        required:true,
        trim:true,
    },
    password: {
        type:String,
        required:true,
    },
    accountType: {
        type:String,
        enum:["Admin", "Student", "Instructor"],
        required:true    
    },
    additionalDetails: {
        type:mongoose.Schema.Types.ObjectId,//refers to profile model
        required:true,
        ref:"Profile",
    },
    courses: [
        {
            type:mongoose.Schema.Types.ObjectId,//refers to course model
            ref:"Course",
        }
    ],
    image:{
        type:String,
        required:true,
    },
    courseProgress: [
        {
            type:mongoose.Schema.Types.ObjectId,//refers to courseProgress model
            ref:"CourseProgress",
        }
    ],

});

module.exports = mongoose.model("User", userSchema);