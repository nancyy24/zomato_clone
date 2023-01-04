const MenuItemsModel = require("../Models/MenuItemModals")

module.exports.getMenuItemListByRestID = async (request,response)=>
{   let data = request.params;
    try{
        let result=await MenuItemsModel.find({restaurantId:data.res_id});
        response.status(200).send({
            status:true,
            result
        });
    }

    catch(error){
        response.status(500).send({
            status:false,
            error
        })
    }
}
