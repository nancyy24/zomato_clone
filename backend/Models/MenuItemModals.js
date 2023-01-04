
const mongoose =require("mongoose")
const Schema = mongoose.Schema;

const MenuItemsSchema = new Schema({
    name: {type: String },
    description: {type:String},
    ingredients: {type:Array},
    restaurantId: {type:String},
    image: {type:String},
    qty: {type:Number},
    price:{type:String}
})

const MenuItemModel = mongoose.model("menuitem",MenuItemsSchema,"menuitems")

module.exports = MenuItemModel;