const mongoose = require("mongoose")
const Schema =mongoose.Schema;

const cuisineSchema = new Schema({
    
        meal_id: {type:Number},
        mealtypes: {type:String},
        one:{type:String},
        two: {type:String},
        three: {type:String},
        four: {type:String},
        five: {type:String}
    
})

const cuisineModel = mongoose.model("cuisine",cuisineSchema,"cuisines")

module.exports=cuisineModel