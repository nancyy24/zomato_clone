
const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken")


const UserSchema = new Schema ({
    given_name:{type:String},
    email:{type:String},
    mobile:{type:Number},
    password:{type:String}
});
const UserModel = mongoose.model("user",UserSchema,"users");

module.exports = UserModel;
