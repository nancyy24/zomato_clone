import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/homePage.css";
import Header from "../Header";
import Swal from "sweetalert2";

function WallPaper(){

    let navigate = useNavigate();

    let [locationList,setLocationList] = useState([]);

    let [disable,setDisable] = useState(true);

    let [restList,setRestList] = useState([]);

    let getLocationList = async()=>{
    try{
        let response = await axios.get("http://localhost:5000/api/get-location")
        let data =response.data;
        // console.log(data);
        // console.log(data.result);
        if(data.status === true){
            setLocationList([...data.result]);
        }
        else{
            setLocationList([]);
        }
    }
    catch(error){
        console.log(error);
        // alert("server error");
        Swal.fire({
            icon: 'error',
            title: 'Server Error',
            text: 'Something went wrong!',
          })
    }
    }

    let getLocationId = async (event) =>{
        let value_data = event.target.value;
        // console.log(value_data);
        if(value_data !== "")
        {   try{
            let response =  await axios.get(`http://localhost:5000/api/get-restaurant-by-location-id/${value_data}`);
            let answer = response.data;
            // console.log(answer);
            // console.log("Answeer",data.result)
            // setRestList([...data.result]);
            // console.log(restList);

            if (answer.result.length !== 0)
            {
                // setDisable(false);
                setRestList( [...answer.result]);
                // console.log("restaurant list",restList);
            }
            else{

                setRestList([]);
                setDisable(true);
                // console.log("restaurant list",restList);


        }
       
        }
        catch(error)
        {    
            // alert("server error");
            Swal.fire({
                icon: 'error',
                title: 'Server Error',
                text: 'Something went wrong!',
              })
        }

        }
        else{
            setRestList([]);
            setDisable(false);
        }
    }
    // console.log("afetr some time",restList);
    useEffect(() => {
        
        getLocationId()
        getLocationList()
    },[]);



    return <>
    
         

         <section className="row backimg">
            {/* <header className="col-12 py-2">
                <div className="container d-flex justify-content-end">
                    <button className="btn text-white me-3 d-none d-sm-block" data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop">Login</button>
                    <button className="btn btn-outline-light me-5 d-none d-sm-block">
                        Create an account
                    </button>
                </div>
            </header> */}
<div className="col-12">  <Header color="" /></div>
           
          <div className="row">
            <div className="col-12 d-flex justify-content-center my-2">
                <p className="m-0 logo_main text-danger h1 fw-bold">e!</p>
            </div>
            <div className="col-12 d-flex justify-content-center my-2">
                <p className="m-0 text-white h2 text-center">
                    Find the best restaurants, cafés, and bars
                </p>
            </div>
            <div className=" d-flex justify-content-center my-2 mb-5">
                    <div className=" col-12 col-sm-3 p-sm-2 mb-2 ">
                        <div className="set-location me-3">
                            {/* <input placeholder="Please type a location" className="form-control p-3 p-sm-2 " /> */}
                            <select className=" form-control p-3 p-sm-2 cursor-pointer" onChange={(event)=>{getLocationId(event)} }>
                            <option value="" > Please select a location</option>
                            { locationList.map((location,index) => {
                            return (<option value={location.location_id} key={index} > {location.name},{location.city}</option>)
                                
                            })
                            }
                            </select>
                            {/* <!-- <ul className="set-location-list text-muted small">
                                <li className="set-bottom p-1">Sarjapur Road, Bengaluru </li>
                                <li className="set-bottom p-1">HSR Layout, Bengaluru</li>
                                <li className="set-bottom p-1">Kormangala, Bengaluru</li>
                                <li className="p-1">Jay Nagar, Bengaluru</li>
                            </ul> --> */}
                        </div>
                    </div>
                    <div className=" col-12 col-sm-3 p-2">
                        <div className="set-location ">
                            <div className="input-group">
                                <span className="input-group-text"><i className="fa fa-search"></i></span>
                                <input type="text" className="form-control p-3 p-sm-2" placeholder="Search for restaurants" disabled={disable} />
                            </div>
                        {restList.length !== 0 ? (restList.map((rest,index) => { return ( <ul className="set-location-list " key={"index"} >
                            <li className="set-bottom p-1 z-index cursor-pointer " onClick= {()=> navigate("/restaurant/"+rest._id)}>
                                    <div className="d-flex z-index ">
                                        <img src={"Images/"+rest.image} className="search-list-img" />
                                        <div className="ms-1" >
                                            <p className="m-0 fw-bold h6">{rest.name}

                                            {/* <span className="m-0 ms-2 text-muted h6">({rest.locality},{rest.city})</span> */}
                                            </p>
                                            {/* <p className="m-0 text-muted h6"></p> */}
                                        </div>
                                    </div>
                                </li>
                                </ul>)
                                })) : null }
                         
                            
                            {/* <!-- <ul className="set-location-list  small">
                                <li className="set-bottom p-2">
                                    <div className="d-flex">
                                        <img src="/pictures/1.png" className="search-list-img">
                                        <div className="ms-2">
                                            <p className="m-0 h6 fw-bold ">The Big Chill Cakery</p>
                                            <p className="m-0 small text-muted">Sarjapur Road, Bengaluru</p>
                                        </div>
                                    </div>
                                </li>
                                <li className="set-bottom p-2">
                                    <div className="d-flex">
                                        <img src="/pictures/1.png" className="search-list-img">
                                        <div className="ms-2">
                                            <p className="m-0 h6 fw-bold ">The Big Chill Cakery</p>
                                            <p className="m-0 small text-muted">Sarjapur Road, Bengaluru</p>
                                        </div>
                                    </div>
                                </li>
                                <li className="p-2">
                                    <div className="d-flex">
                                        <img src="/pictures/1.png" className="search-list-img">
                                        <div className="ms-2">
                                            <p className="m-0 h6 fw-bold ">The Big Chill Cakery</p>
                                            <p className="m-0 small text-muted">Sarjapur Road, Bengaluru</p>
                                        </div>
                                    </div>
                                </li>
                            </ul> --> */}
                        </div>
                    </div>
                </div>
                </div>
        </section>
       
    </>
}

export default WallPaper;

