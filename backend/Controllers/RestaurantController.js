const restaurantModel = require("../Models/RestaurantModel")

module.exports.home = (request,response) =>{
    response.status(200).send({
        status:true
    });
};

module.exports.getrestaurantlist = async (request,response) =>
{
    let result = await restaurantModel.find()

    response.status(200).send({
        status:true,
        result
    });
};

module.exports.getRestaurantListByLocId = async (request,response)=>
{
    let loc_id = request.params.loc_id;
    let result =  await restaurantModel.find({location_id:loc_id})
    response.status(200).send({
        status:true,
        loc_id,
        result
    });
};


module.exports.getRestaurantDetailsById = async (request,response)=>{
    try{
    let rest_id =request.params.id;
    let result = await restaurantModel.findOne({_id:rest_id})
    if(result){
    response.status(200).send({
        status:true,
        result
    });

    }
    else{
        response.status(200).send({
            status:false,
            message:"no such restaurant"
        })
    }
}
    catch(error){
            response.status(500).send({status:false,
            error,
        message:"server error,contact to admin"});
};
};


module.exports.filterData = async (request,response)=>
{   let { meal_type,location,cuisine, hcost, lcost,sort,page} = request.body
    // let filter={
    //     location_id:1
    // }

    // sort +1 the low to high
    // sort -1 then high to low
    if(sort == undefined){
        sort =1
    }

    // hcost:1000
    // lcost:500
    if(page === undefined ){
        page=1;
    }
    let perpage = 2;
    let startindex = (page-1)*perpage;
    let endindex = page*perpage;

    let filter={}
    if(location !== undefined) {
        filter["location_id"] = location
    }
    if(meal_type !== undefined){
        filter["mealtype_id"] = meal_type
    }
    if(cuisine !== undefined ){
        filter["cuisine_id"] = { $in :cuisine}
    }
    if(hcost !== undefined && lcost !== undefined){
            filter["min_price"]={ $gte :lcost, $lte:hcost }
    }
    
    let result = await restaurantModel.find(filter).sort({
        min_price:sort
    })
    let newresult =result.slice(startindex,endindex);
    response.status(200).send({

        status:true,
        newresult
    })
}