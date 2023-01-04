
const locationModel = require("../Models/locationModel")
module.exports.getlocationlist = async (request,response)=>
{   try{
    var result = await locationModel.find()

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

// 