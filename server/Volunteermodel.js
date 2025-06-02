const mongoose = require("mongoose");

const Volunteers = mongoose.Schema({
    name:String,
    email:String,
    password:String,
    dob:String,
    phone:Number,
    gender:String
});

const Volunteer = mongoose.model("Volunteer", Volunteers);

module.exports=Volunteer;