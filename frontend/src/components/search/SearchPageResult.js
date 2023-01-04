import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";




function SearchPageResult(){

    let params = useParams();
    let {meal_id} = params;
    // console.log(meal_id);
    let navigate = useNavigate();
    let [restaurantList , setRestaurantList] = useState([]);
    let [locationList,setLocationList] = useState([]);
    let [filter,setFilter] = useState({meal_type : meal_id})
    let [increaseValue,setIncreaseValue] = useState(2)
    let [decreaseValue,setdecreaseValue] = useState(1);
    let [cuisineOrder,setCuisineOrder] = useState([]);
    let [cuisineList,setCuisineList] = useState([])

    let getCuisineList = async() =>{
      try{
        let response = await axios.get("http://localhost:5000/api/get-cuisines")
        let data = response.data;
         console.log(data);
         if(data.status === true){
            setCuisineList([...data.result]);
            console.log(cuisineList);
            console.log(cuisineList);
            // let oneTime = cuisineList[0];
            //  console.log(oneTime);
              // let one = oneTime.one;
    
      }
      else{
          setCuisineList([]);
      }

      }
      catch(error){
        alert("server error")
      }
      console.log(cuisineList);


    }
    let getLocationList = async()=>{
      try{
          let response = await axios.get("http://localhost:5000/api/get-location")
          let data =response.data;
          // console.log(data);
          if(data.status === true){
              setLocationList([...data.result]);
          }
          else{
              setLocationList([]);
          }
      }
      catch(error){
          // console.log(error);
          // alert("server error");
          Swal.fire({
            icon: 'error',
            title: 'Server Error',
            text: 'Something went wrong!',
          })
      }
      }

    let filterOperation = async (filter) =>
    {
      let URL = "http://localhost:5000/api/filter";
     
      try{
      let response = await axios.post(URL,filter)
      // console.log(response);
      let data= response.data;
      if(data.status === true){
        setRestaurantList([...data.newresult]);
        // console.log(restaurantList);
      }
      }
      catch(error){
        // alert("server error");
        Swal.fire({
          icon: 'error',
          title: 'Server Error',
          text: 'Something went wrong!',
        })
        
        // console.log(error);
      }
    }
  
    let makeFiltration = (event,type) =>{
      let value = event.target.value;
      console.log(value);
      let ischecked= event.target.checked;
      console.log(ischecked);
      // console.log(event);
      // console.log( value);
      let cuisine=[];
     
      // let filter = {
      //   meal_type :meal_id
      // }
      

      switch(type)
      {
        case "location":
          if (Number(value)>0)
          {
          filter["location"] = Number(value);}
          else{
            delete filter["location"];
          }
          break;
        case "sort":
          filter["sort"] = Number(value)
          break;
        case "cost-for-two":
          let costForTwo = value.split("-");
          filter["lcost"] = Number(costForTwo[0]);
          filter["hcost"] = Number(costForTwo[1]);
          break;
        case "page":
          filter["page"] = Number(value);
          break;
        case "cuisine":
          // cuisine.push(Number(value));
          if(ischecked === false)
          {
             let index = cuisineOrder.indexOf(Number(value));
            cuisineOrder.splice(index, 1);
            setCuisineOrder(cuisineOrder);
          }
          else{
            cuisine.push(Number(value));
          cuisineOrder.push(...cuisine);
          setCuisineOrder([...new Set(cuisineOrder)])
          console.log([...new Set(cuisineOrder)])

          }
  

          // console.log(cuisine);
          // setCuisineOrder();
          // console.log(cuisineOrder);
          filter["cuisine"] = cuisineOrder;

      }
      setFilter(filter);
      filterOperation(filter);
    }

    // console.log(cuisineList);
    // let oneTime = cuisineList[0];
    // console.log(oneTime);
    // let one = oneTime.one;
    

// console.log(cuisineList[0].mealtypes)


    useEffect(()=>{
      // let filter = {
      //   meal_type:meal_id
      // }
      getCuisineList();
      filterOperation(filter);
      getLocationList();
     },[])
// console.log(cuisineList[0].mealtypes)
    return (<>
      <section className="row">
      <div className="col-12">

        <div className="container-lg">
        { cuisineList.length !== 0 ? (<p className="m-0 h2 fw-bold my-3">Favourite { cuisineList[meal_id-1].mealtypes} Places</p>) : null}
         
          <div className="row">
            <div className="col-12 col-lg-3 col-md-3 col-sm-4 col-xs-3 border border-1 p-lg-3 p-md-3 p-2">
              <div className="d-flex justify-content-between">
              <p className="m-0 fw-bolder">Filters</p>
              <button className="btn-sm d-sm-none" type="button" data-bs-toggle="collapse" data-bs-target="#hide-filter" aria-expanded="false" aria-controls="hide-filter">Hide</button>
            </div>
            <div className="collapse show" id="hide-filter">
              <p className="m-0 text-black fw-bold">Select Location</p>
              <select className="mt-2 form-select text-muted"
               onChange={(event)=>{ makeFiltration(event,"location");
              }}>
                <option value="-1">----select----</option>
                {
                  locationList.map((location,index)=>{
                    return (
                      <option  value={location.location_id} key={index}  >
                          {location.name},{location.city}
                      </option>
                    )
                  })
                }
              </select>
              {/* <!-- cuisine --> */}
              <p className="m-0 mt-4 mb-2 fw-bold">Cuisine</p>
              {/* { cuisineList.map((cuisine,index)=>{
                return ( <div className="form-check">
                <input type="checkbox" className="form-check-input" value="1"
                  onChange={(event) => {makeFiltration(event,"cuisine")}}/>
                <label className="form-check-label text-black fw-bold" 
                >North Indian</label>
              </div>)
              })} */}

              {
                cuisineList.length !== 0 ? ( <div className="form-check">
                <input type="checkbox" className="form-check-input" value="1"
                  onChange={(event) => {makeFiltration(event,"cuisine")}}/>
                <label className="form-check-label text-black fw-bold" 
                >{cuisineList[meal_id-1].one}</label>
              </div>) : null 
              }
              {
                cuisineList.length !== 0 ? ( <div className="form-check">
                <input type="checkbox" className="form-check-input" value="2"
                  onChange={(event) => {makeFiltration(event,"cuisine")}}/>
                <label className="form-check-label text-black fw-bold" 
                >{cuisineList[meal_id-1].two}</label>
              </div>) : null 
              }
              {
                cuisineList.length !== 0 ? ( <div className="form-check">
                <input type="checkbox" className="form-check-input" value="3"
                  onChange={(event) => {makeFiltration(event,"cuisine")}}/>
                <label className="form-check-label text-black fw-bold" 
                >{cuisineList[meal_id-1].three}</label>
              </div>) : null 
              }
              {
                cuisineList.length !== 0 ? ( <div className="form-check">
                <input type="checkbox" className="form-check-input" value="4"
                  onChange={(event) => {makeFiltration(event,"cuisine")}}/>
                <label className="form-check-label text-black fw-bold" 
                >{cuisineList[meal_id-1].four}</label>
              </div>) : null 
              }
              {
                cuisineList.length !== 0 ? ( <div className="form-check">
                <input type="checkbox" className="form-check-input" value="5"
                  onChange={(event) => {makeFiltration(event,"cuisine")}}/>
                <label className="form-check-label text-black fw-bold" 
                >{cuisineList[meal_id-1].five}</label>
              </div>) : null 
              }
              {/* <div className="form-check">
                <input type="checkbox" className="form-check-input"  value="2"
                   onClick={(event) => {makeFiltration(event,"cuisine")}}
                />
                <label className="form-check-label text-black fw-bold " >South Indian</label>
              </div>
              <div className="form-check">
                <input type="checkbox" className="form-check-input"  value="3"
                   onClick={(event) => {makeFiltration(event,"cuisine")}}
                />
                <label className="form-check-label text-black fw-bold" >Chinese</label>
              </div>
              <div className="form-check">
                <input type="checkbox" className="form-check-input" value="4"
                 onClick={(event) => {makeFiltration(event,"cuisine")}} />
                <label className="form-check-label text-black fw-bold" >Fast Food</label>
              </div>
              <div className="form-check">
                <input type="checkbox" className="form-check-input" value="5"
                 onClick={(event) => {makeFiltration(event,"cuisine")}} />
                <label className="form-check-label text-black fw-bold" >Street Food</label>
              </div>  */}
              {/* <!-- cost --> */}
              <p className="m-0 mb-2 mt-4 fw-bold">Cost For Two</p>
              <div className="form-check">
                <input type="radio" className="form-check-input" name="cost-for-two" value="0-500" onChange={(event) => {makeFiltration(event,"cost-for-two")}} />
                <label className="form-check-label text-black fw-bold">Less than ` 500</label>
              </div>
              <div className="form-check">
                <input type="radio" className="form-check-input"  name="cost-for-two" value="500-1000" onChange={(event) => {makeFiltration(event,"cost-for-two")}}/>
                <label className="form-check-label text-black fw-bold">` 500 to ` 1000</label>
              </div>
              <div className="form-check">
                <input type="radio" className="form-check-input"  name="cost-for-two" value="1000-1500" onChange={(event) => {makeFiltration(event,"cost-for-two")}}/>
                <label className="form-check-label text-black fw-bold">` 1000 to ` 1500</label>
              </div>
              <div className="form-check">
                <input type="radio" className="form-check-input"   name="cost-for-two" value="1500-2000" onChange={(event) => {makeFiltration(event,"cost-for-two")}}/>
                <label className="form-check-label text-black fw-bold">` 1500 to ` 2000</label>
              </div>
              <div className="form-check">
                <input type="radio" className="form-check-input"  name="cost-for-two" value="2000-99999" onChange={(event) => {makeFiltration(event,"cost-for-two")}}/>
                <label className="form-check-label text-black fw-bold">` 2000+</label>
              </div>
              {/* <!-- sort --> */}
              <p className="m-0 mb-2 mt-4 fw-bold">Sort</p>
              <div className="form-check">
                <input type="radio" className="form-check-input" name="sort" value="1" onChange={(event) =>{ makeFiltration(event,"sort")}}/>
                <label className="form-check-label text-black fw-bold">Price low to high</label>
              </div>
              <div className="form-check">
                <input type="radio" className="form-check-input" name="sort" value="-1" onChange={(event) =>{ makeFiltration(event,"sort")}} />
                <label className="form-check-label text-black fw-bold">Price high to low</label>
              </div>
            </div>
          </div>

            {/* <!-- search area --> */}
            <div className="col-12 col-lg-8 col-md-8 col-sm-7 col-xs-9 ms-0 ms-sm-3 p-xs-0 mt-sm-0 mt-3">
              {
                restaurantList.map((restaurant,index)=> {
                  return(
                <div className="row mb-3 cursor-pointer" key={index}  onClick= {()=> navigate("/restaurant/"+restaurant._id) }>
                <div className="col-12 border border-1 p-3 p-sm-4">
                  <div className="d-flex">
                    <img src={"/Images/"+restaurant.image} className="resize_img" />
                    <div className="ms-4">
                      <p className="m-0 h3 fw-bold"> { restaurant.name }</p>
                      <p className="m-0 fw-bold">{restaurant.city}</p>
                      <p className="m-0 text-muted">
                        <i className="fa fa-map-marker fa-2x text-danger" aria-hidden="true"></i>
                        {restaurant.locality},{restaurant.city}
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div className="row text-muted">
                    <div className="col-6 col-sm-6 col-md-4">
                      <p className="m-0 mb-2 fw-bold">CUISINES:</p>
                      <p className="m-0 mb-2 fw-bold">COST FOR TWO:</p>
                    </div>
                    <div className="col-6 col-sm-6 col-md-8">
                      <p className="m-0 mb-2 fw-bold">
                        {
                          restaurant.cuisine.map((value,index) => {
                              return ('"'+value.name+'"  ')
                          })
                        }
                      </p>
                      <p className="m-0 mb-2 fw-bold"><i class="fa fa-inr" aria-hidden="true"></i>{restaurant.min_price}</p>
                    </div>
                  </div>
                </div>
              </div>)}
              )
              }
             
              
              <div className="row mt-4">
                <div className="col-12 justify-content-center d-flex">
                  <ul className="pagination">
                    <li className="page-item group-item"  value={decreaseValue} 
                    onClick={ (event) =>{  {  makeFiltration(event,"page");
                                                 decreaseValue <= 1  ?
                                                    ( setdecreaseValue(1) )
                                                        : 
                                                    (setdecreaseValue(decreaseValue-1))}
                                                        }} >&lt;</li>
                    <li className="page-item group-item" value="1" onClick={(event) =>{ makeFiltration(event,"page");
                                                                                        setIncreaseValue(2);
                                                                                        setdecreaseValue(0)}}>1</li>
                    <li className="page-item group-item" value="2" onClick={(event) =>{ makeFiltration(event,"page");
                                                                                        setIncreaseValue(3);
                                                                                        setdecreaseValue(1)}
                                                                                              }>2</li>
                    <li className="page-item group-item" value="3" onClick={(event) =>{ makeFiltration(event,"page");
                                                                                         setIncreaseValue(4);
                                                                                         setdecreaseValue(2)}}>3</li>
                    <li className="page-item group-item" value="4" onClick={(event) =>{ makeFiltration(event,"page");
                                                                                          setIncreaseValue(5);
                                                                                          setdecreaseValue(3)}}>4</li>
                    <li className="page-item group-item" value="5" onClick={(event) =>{ makeFiltration(event,"page")
                                                                                        }}>5</li>
                    <li className="page-item group-item"  value={increaseValue} 
                    onClick={ (event) =>{  {  makeFiltration(event,"page");
                                                 increaseValue >= 5  ?
                                                    ( setIncreaseValue(1) )
                                                        : 
                                                    (setIncreaseValue(increaseValue+1))}
                                                        }}>&gt;</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>);
}

export default SearchPageResult;