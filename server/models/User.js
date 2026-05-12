const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    studentId:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
        required:true
    },

    role:{
        type:String,
        enum:["student","warden","security"],
        default:"student"
    }

});

module.exports = mongoose.model("User", userSchema);