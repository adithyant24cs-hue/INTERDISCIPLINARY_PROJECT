const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({

    studentId:{
        type:String,
        required:true
    },

    reason:{
        type:String,
        required:true
    },

    fromDate:{
        type:String,
        required:true
    },

    toDate:{
        type:String,
        required:true
    },

    scannedAt:{
        type:Date,
        default:Date.now
    }

});

module.exports = mongoose.model(
    "Log",
    logSchema
);