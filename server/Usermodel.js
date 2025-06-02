const mongoose = require("mongoose");


const User = mongoose.Schema({
    name:String,
    email:String,
    password:String,
    dob:String,
    phone:Number,
    gender:String
});


const Users = mongoose.model("Users", User);

module.exports=Users;