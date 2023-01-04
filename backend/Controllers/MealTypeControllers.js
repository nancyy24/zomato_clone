
var MealTypesModel = require("../Models/mealTypeModel");
module.exports.getMealTypeList = async (request,response)=>
{   try{
    let result = await MealTypesModel.find()
    response.status(200).send({
        status:true,
        result
    });
    }
    catch(error)
    {
        response.status(500).send({
            status:false,
            error
        })
    }

};