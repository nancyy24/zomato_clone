const cuisineModel = require("../Models/CuisineModel")
module.exports.getcuisinelist = async (request,response)=>
{   try{
    var result = await cuisineModel.find()

    response.status(200).send({
        status:true,
        result
    });
        }
catch(error){
    response.status(500).send({
        status:true,
        error});
}
};
