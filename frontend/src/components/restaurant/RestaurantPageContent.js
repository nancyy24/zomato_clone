import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode"
import Swal from "sweetalert2";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel} from "react-responsive-carousel";





function RestaurantPageContent() {
        let [tab,setTab] = useState(1);
        let navigate = useNavigate();
        let [totalPrices,setTotalPrices] = useState(0)
        let getTokenDetails = () => {
          let token = localStorage.getItem("auth-token")
          if(token === null)
          {
            return false;
          }
          else{
            return jwt_decode(token);
          }
        }
        
        let [userDetails,setUserDetails] = useState(getTokenDetails());
        
        let defaultValue ={aggregate_rating:0,
          city:"",
          city_id:-1,
          contact_number:0,
          cuisine:[],
          cuisine_id:[],
          image:"",
          locality:"",
          location_id:-1,
          mealtype_id:-1,
          min_price:0,
          name:"",
          rating_text:"",
          thumb:[],
          _id:-1}
        let [restaurant,setRestaurant] = useState({...defaultValue});
        let [menuItems, setMenuItems]= useState([]);
        let {id} = useParams();
        let getRestaurantDetails = async()=>{
          try{
          let URL = "http://localhost:5000/api/get-restaurant-details-by-id/"+id;
          let response = await axios.get(URL);
          let data = response.data;
          // console.log(data);
          if(data.status === true)
          {
            setRestaurant({...data.result});

          }
          else{
            setRestaurant({...defaultValue});
          }
        }
        catch(error){
          // alert("server error");
          Swal.fire({
            icon: 'error',
            title: 'Server Error',
            text: 'Something went wrong!',
          })
        }



        }

        let getMenuItems = async()=>
        {
          try{
            let URL = "http://localhost:5000/api/get-menu-item-list-by-restaurant-id/"+id;
            let {data} = await axios.get(URL);
            if(data.status === true)
            {
              // console.log(data);
              setMenuItems([...data.result]);
            }
            else{
              setMenuItems([...data.result]);
            }
            setTotalPrices(0)
          }
          catch(error)
          {
            // alert("server error")
            Swal.fire({
              icon: 'error',
              title: 'Server Error',
              text: 'Something went wrong!',
            })
          }
        }

        let addItemQuantity = (index) =>
        {
          let _menuItems = [...menuItems];
          _menuItems[index].qty += 1;
          let _price = Number(menuItems[index].price);
          setTotalPrices(totalPrices + _price);  //updating total price state
          setMenuItems(_menuItems);  //updating the menu items
        }

        let removeItemQuantity = (index) =>
        {
          let _menuItems = [...menuItems];
          _menuItems[index].qty -= 1;
          let _price = Number(menuItems[index].price);
          setTotalPrices(totalPrices - _price);  //updating total price state
          setMenuItems(_menuItems);  //updating the menu items
        }

        async function loadScript() {
          const script = document.createElement("script");
          script.src = "https://checkout.razorpay.com/v1/checkout.js";
          script.onload = () => {
             return true;
          };
          script.onerror = () =>
          {
            return false;
          };
          window.document.body.appendChild(script);
        }

        let displayRazorpay = async () =>
        {
        let isLoaded = await loadScript()
        if(isLoaded === false){
          // alert("sdk is not loaded")
          Swal.fire({
            icon: 'error',
            title: 'SDK is not Loaded',
            text: 'Something went wrong!',
          })
          .then(()=>
          {
            return false;
          })
          
        }
        let serverData = {
          amount:totalPrices
        }
        var {data} = await axios.post(
          "http://localhost:5000/api/payment/gen-order",serverData
        );
        // console.log(data);
        // return false;
          var order = data.order;
var options = {
    "key": "rzp_test_smUx8oAyn9O4KS", // Enter the Key ID generated from the Dashboard
    "amount": order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": order.currency,
    "name": "Zomato Clone Payment",
    "description": "Buying the product from zomato",
    "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHwAAAB8CAMAAACcwCSMAAAAeFBMVEXiN0T////jO0fiNULiMkDhKzrhLjzhKDjwqq7hJTX98vP31Nb++fnkTFfgHzHgGi3fAB365eb87e7zur3kUVv1xsn54OHlVl/nZW3qgYftlJn42dvys7bocHffDSbum6Dpd372zc/vo6friI7dAADjRE/lXGXeABGxsPaeAAAEq0lEQVRoge2b65KjKhCAUW7iDS/RmESNxtF5/zdcoCGjmZ2q/bObOqfoqZqAQn9NX5CkEhREGQrfICiLAhRJjN4iWEYoexNb0bN3kbWE6s/DPdzDPdzDPdzDPdzDPdzDPdzDPdzDPdzDPdzDPfw/CsfkbXAi6Pln+t+EY150dXCn74Dj8BEHQTD9w5V/fXrPl0DLH7od7z72f7YxYeRwHTqE2qv42UKYiZwSlnPTx3mj2Sl3UxDhQvC9KTu4wlDKqRb1n5kZjONu6kIKceOcUxZiffl0GZjWQ+l22ageSwQbojm5Jc1CmLaEtBoefxJi6Ixn16i/njj7HZw2ZXtLQG5t1RGExykxrmsvoxog+mZu44Bi2Wm91YqRXCrVStTa860OnMSDwFmZQke9NDlC49RCv9zE7+BVsJeOEJY8e2Z+bJpIPtw18GwQ3DmZDpM32u16d47l/NVdxDc4pofpQcfY3ppIOPh4t5eqj8aZJnEY7yc3496YgeXJ/u5GXuEkO7DbVcz7fnrCBThyc5eqJyCRSDZB2kbLFJlB6cd1N/ecRwfdc/4Kp1AZNlJxJm1/sU6+8wKQrRtTxkHsVo7YVJ+loHSEaR9TD35r+j4KzzCsv1RWOX5d+Xkahm7rYdyJhjCwywvIpGQk1vCGWXuCyIbyoaKoSkyVkshDc6Vgxc1wQpkLCeHpi3yAeQP5XmqEyAvc3SgDn84FsrlUjjaHbjK38H60ai8MYckuUd00vfFwXODVGF+pIsUn46BYFfwau/EvcCW5ZU8CObUUETC3LGwYV2KTPB1xbpaXdoSFX5UGbjqb4LSqRt06RrXjVj/CxQDR1LUgW6vWzW0/ISKq6GhinY3D0qxpZedDsgd1bk1W2YDEw8XGrXz6Dqcb3LrmeoMyalO1M3MoraZwvrDIdCMEmKWU5rUeuq4zht05vTgiysEpi3LiltqZr3BiS/WhCwHjJ3yEdS45bFEZwZlREQtMIA1miMhSqKyBQCxMRC5sO7itqBJ/y3Zq2R+FEmlRHSOASjMCMRmV/aZRFYjZ5Y2zVlnoHRyqaiA2Z9Q+KazbI4kKUNq/1jnBdj9rYyXpbJ08F+IGUZSreY0LZD06SxfNSWil5SdWzzVwWIZH4FzkVmNImnj9tHtN9rLD4RAYTiJpt68Y1puudHgiQUf0LImNm8l3xjfQkjI0ltCKVcemWWqT8vG6t7PjgyGYKG73/YHavOsVcjYtFUNYXrXmUAilepIZ/8WjvaUloeKxVzUL/Aq/HOHKg9uue8ld2lwpsumgtilhUDdGQjewMV4pR2TtUVILTHduTZ7sL/hyhKvypCdXu+1Zb5+AXBg+QSRULkF2qccKhR0ivRamNCqVlZl7AuiDgXDPv+C++4rGM+brloWEmbMKXk/m4EWKqZ+TOTqPJkFCbMSMPrT0MYrJ4bqcC45ORoiunnvd1Pe1MJPHLGpuSb3kz5PEPtuxPu04ITYdmeCUC9v5iW2LVp3BjMVGzD0u+NeZjXCtih6+HfL/frvk4R7u4R7u4R7u4R7u4R7u4R7u4R7u4R7u4R7u4R7u4R7+r+BvlPC9Pw19649igyh7x6+BwzCLgl/lQEak03JG1wAAAABJRU5ErkJggg==",

    "order_id": order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    "handler": async function (response){
      var sendData = {
      razorpay_payment_id :response.razorpay_payment_id,
      razorpay_order_id : response.razorpay_order_id,
      razorpay_signature : response.razorpay_signature
      };
      var {data} = await axios.post("http://localhost:5000/api/payment/verify",sendData);
      // console.log(data);
      if(data.status === true)
      {
        // alert("Order Placed Successfully");
        Swal.fire({
          icon: 'success',
          title: 'Order Placed Successfully',
          text: 'Your order will deliver soon!',
        })
        .then(() =>
        {
          window.location.replace("/");

        })
        // navigate("/");
      }
      else{
        // alert("Payment Failed Try Again")
        Swal.fire({
          icon: 'error',
          title: 'Payment Failed Try Again',
          text: 'Something went wrong!',
        })
      }

    },
    "prefill": {
        "name": userDetails.given_name,
        "email": userDetails.email,
        "contact": "9999999999"
    },
   
};
var razorpayObject= window.Razorpay(options);
razorpayObject.open();
        }
useEffect(() =>{
  getRestaurantDetails()
},[])


  return (

    <>
    {/* carausel */}
    <div className="modal fade" id ="slideShow" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div className="modal-dialog modal-lg" style={{ height :"75vh"}}>
    <div className="modal-content">
      <div className="modal-body h-75">
      <Carousel showThumbs={false} infiniteLoop={true}>
      {
        restaurant.thumb.map((value,index) => {
          return (<div key={index} className="w-120">
                <img src={"/Images/"+value} />
          </div>);
        })
      }

      </Carousel>

      </div>
      </div>
    </div>

    </div>
    <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
  <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
    <div className="modal-content">
      <div className="modal-header">
      {/* heading */}
        <h5 className="modal-title" id="exampleModalToggleLabel">Menu Items</h5>
        {/* close button */}
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      {
        menuItems.map((menu_item,index)=>{
        return (  <div className="row mb-2" key={index}>
          <div className="col-8">
            <p className="m-0">{menu_item.name}</p>
            <p className="m-0">@{menu_item.price}</p>
            <p className="m-0">{menu_item.description}</p>
          </div>
        <div className="col-4">
          <div  className="d-flex justify-content-between position-relative">
            <img src={"/Images/"+menu_item.image }alt="" className="menuImg"/>
            { menu_item.qty === 0 ?
            (<div className="position-absolute">
            
            <button className="btn btn-primary add" onClick={() => addItemQuantity(index)}>ADD</button>
          </div>
            ) :
            <div className="d-flex quantity px-3">
             <p className="my-0 mx-2 border border-dark p-1 bg-white cursor-pointer"  onClick={() => removeItemQuantity(index)}>-</p> 
             <p className="my-0 mx-2 border border-dark p-1 bg-white">{menu_item.qty}</p>
             <p className="my-0 mx-2 border border-dark p-1 bg-white cursor-pointer"  onClick={() => addItemQuantity(index)}>+</p>
            </div>
            }
          </div>
        </div>
        <hr className="p-0 mt-4"></hr>       

        </div>
        )
      
        })
        
       
      }
       
      { totalPrices > 0 ?
      (<div className="row d-flex justify-content-between my-3">
          <h4 className="col-7 ms-3"
          >SUBTOTAL { totalPrices}</h4>
          <button className="btn btn-danger col-3 me-5" 
          data-bs-target="#exampleModalToggle2" data-bs-toggle="modal"
        
          >Pay Now </button>
        </div>) : null
      }
      
      </div>
      
    </div>
  </div>
</div>
<div className="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabIndex="-1">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalToggleLabel2">{restaurant.name}</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      {/* user name */}
      <div className="mb-3">
  <label for="exampleFormControlInput1" className="form-label">User Name</label>
  <input type="email" className="form-control" id="exampleFormControlInput1"  value={userDetails.given_name} readOnly onChange={() =>{}}/>
</div>
{/* email address */}
      <div className="mb-3">
  <label for="exampleFormControlInput1" className="form-label">Email address</label>
  <input type="email" className="form-control" id="exampleFormControlInput1" value ={userDetails.email} readOnly  onChange={() =>{}} />
</div>
{/* address */}
<div className="mb-3">

  <label for="exampleFormControlTextarea1" className="form-label">address</label>
  <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" value="" onChange={() =>{}}></textarea>
</div>
      </div>
      <div className="modal-footer d-flex justify-content-between">
        <button className="btn btn-primary" data-bs-target="#exampleModalToggle" data-bs-toggle="modal">Go Back</button>
        <button className="btn btn-success" onClick ={displayRazorpay} >Pay Now</button>
      </div>
    </div>
  </div>
</div>
      <section className="row justify-content-center">
      <section className="col-11">
        <img
          src={"/Images/" + restaurant.image}
          alt=""
          className="col-11 my-3 restaurantimg"
        />
        <button className="btn btn-outline-white fw-bold col-6 col-sm-5 col-md-4 col-lg-3  gallerybutton"  data-bs-toggle="modal" data-bs-target="#slideShow">
          Click to see Image Gallery
        </button>
      </section>
      <section className="col-11 justify-content-center mb-5">
        <div>
          <h2 className="fw-bolder my-4 ">{restaurant.name}</h2>
        </div>
        <div className="d-flex justify-content-between p-2">
          <div >
            <ul className="restaurantdetails">
              <li className="me-5 border-bottom border-danger pb-3 cursor-pointer " onClick={()=>{setTab(1)}}>Overview</li>
              <li className=" border-bottom border-danger cursor-pointer" onClick={()=>{setTab(2)}}>Contact</li>
            </ul>
          </div>
          { userDetails ? (  <button className="btn btn-danger orderbutton"   onClick={getMenuItems} 
         data-bs-toggle="modal" href="#exampleModalToggle" 
         role="button">
         Place Order Online
                
         </button>) : (<button className="btn btn-danger disabled">Login to Place order</button>)}
        
        </div>
       {  (tab === 1) ?        
       (<div>
        <h1 className="fw-bold my-4">About This Place</h1>
        <div>
                <h4 className="fw-bold ">Cuisine</h4>
                {/* <p>
                  { restaurant.cuisine.length>0 ?
                    (restaurant.cuisine.reduce((pvalue,cvalue) =>{
                      return pvalue.name + "," + cvalue.name;
                    })) : null
                  }
                </p> */}
                <p>
                {
                          restaurant.cuisine.map((value,index) => {
                              return ('"'+value.name+'"  ')
                          })
                        }
                        </p>
        </div>
        <div>
                <h4 className="fw-bold ">Average Cost</h4>
                <p><i className="fa fa-inr" aria-hidden="true"></i>{restaurant.min_price} for two people(approx.)</p>
        </div>
        </div>)
        :
        (<div>
        <h1 className="fw-bold my-4">Contact</h1>
        <div>
                <h4 className="fw-bold ">Phone Number</h4>
                <p className="text-danger">{"+"+ restaurant.contact_number}</p>
        </div>
        <div>
                <h4 className="fw-bold ">{restaurant.name}</h4>
                <p>{restaurant.locality + " , " + restaurant.city}</p>
        </div>
        </div>)
       }
      </section>
      </section>

    </>
  );
}

export default RestaurantPageContent;
