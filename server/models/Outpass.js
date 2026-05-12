const mongoose = require("mongoose");

const outpassSchema = new mongoose.Schema({

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

    status:{
        type:String,
        enum:["pending","approved","rejected"],
        default:"pending"
    },

    qrCode:{
        type:String,
        default:""
    },

    createdAt:{
        type:Date,
        default:Date.now
    }

});

module.exports = mongoose.model(
    "Outpass",
    outpassSchema
);