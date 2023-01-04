
var mongoose =require("mongoose")
var Schema = mongoose.Schema

var mealTypeList = new Schema({
    name: {type:String},
    content: {type:String},
    image: {type:String},
    meal_type: {type:Number}
})

var mealTypeModel=mongoose.model("mealtype",mealTypeList,"mealtypes")

module.exports = mealTypeModel