const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    companyName : {
        type : String,
        required : true,
    },
    companyUrl : {
        type : String,
        required : true,
    },
    position : {
        type : String,
        required : true,
    },
    salary : {
        type : String,
        required : true,
    },
    jobType : {
        type : String,
        enum : ['Full-time', 'Part-time'],
        required : true,
    },
    remote : {
        type : String,
        enum : ['Remote', 'Office'],
        required : true,
    },
    location : {
        type : String,
        required : true,
    },
    jobDiscription : {
        type : String,
        required : true,
    },
    companyInfo : {
        type : String,
        required : true,
    },
    skills : {
        type : [String],
        required : true,
    },
    additionalInfo : {
        type : String
    },
    name : {
        type : String,
        required : true
    }
},{timestamps: true})

const Job = mongoose.model('Job',userSchema)

module.exports = Job