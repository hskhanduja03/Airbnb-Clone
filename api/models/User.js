const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique:true
    },
    password:String,
    accomodations:[]
})

const UserModel = mongoose.model('User', UserSchema);

module.exports=UserModel;