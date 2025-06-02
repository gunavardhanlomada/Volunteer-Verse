const mongoose = require("mongoose");


const Application = mongoose.Schema({
    email:String,
    name:String,
    age:Number,
    phone:Number,
    address:String,
    interest:String
})

const Applications = mongoose.model("Applications",Application);

module.exports=Applications;
