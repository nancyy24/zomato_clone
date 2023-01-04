
const mongoose = require("mongoose")
const Schema =mongoose.Schema;

const locationSchema =new Schema({
    name:{type:String},
        city_id:{type:Number},
        location_id:{type:Number},
        city:{type:String} ,
        country_name:{type:String}
})

const locationModel = mongoose.model("location",locationSchema,"locations")

module.exports=locationModel