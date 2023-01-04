import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useNavigate} from "react-router-dom";
import Swal from "sweetalert2";


function QuickSearch(){

    let [mealTypeList,setMealTypeList] = useState([]);
    
    let getMealTypes = async() =>{
    try{
    let  response = await axios.get("http://localhost:5000/api/get-meal-types");
    // console.log(response);
    // console.log(response.data);
    let data= response.data;
    if(data.status === true)
    {
        setMealTypeList([...data.result]);
        // console.log(...data.result);
        // console.log("result",data.result);
    }
    else{
        setMealTypeList([]);
    }
    }
    catch(error){
        Swal.fire({
            icon: 'error',
            title: 'Server Error',
            text: 'Something went wrong!',

          })
    }}
    let navigate = useNavigate();
    let getQuickSearchPage = (id) => {
        
        navigate("/search-page/"+id);
    }
    useEffect(()=>{
        getMealTypes();
    },[]);


    
    // console.log("answer",...data.result);
    // console.log(mealTypeList);


    
    return <>
         <section className="row">
            <div className="col-12 ">
                <div className="container-fluid">
                    <p className="m-0 h3 mt-4 mt-sm-5 fw-bold">Quick Searches</p>
                    <p className="m-0 small text-muted mt-1 mb-3"> Discover restaurants by type of meal</p>
                    {/* <!-- first row --> */}
                    <div className="row justify-content-between ">
                        { mealTypeList.map((mealType,index) => {
                        return (<div key={index}   onClick = { () => getQuickSearchPage(mealType.meal_type)} className=" col-4 cursor-pointer  border border-1 ps-0 d-flex setwidth set-border mb-3 ">
                            <img src={"Images/"+mealType.image} className="section-img" />
                            <div className="p-0 ms-2 pt-2">
                                <p className="m-0 h4 fw-bold">{mealType.name}</p>
                                <p className="m-0  small text-muted ">{mealType.content}</p>
                            </div>
                        </div>);

                        })
                        }
                        {/* <div className=" col-4 border border-1 ps-0 d-flex setwidth set-border mb-3">
                            <img src="Images/2.png" className="section-img" />
                            <div className="p-0 ms-2 pt-2">
                                <p className="m-0 h4 fw-bold">Lunch</p>
                                <p className="m-0  small text-muted ">Start your day with exclusive breakfast options</p>
                            </div>
                        </div>
                        <div className="col-4 border border-1 ps-0 d-flex setwidth set-border mb-3">
                            <img src="Images/3.png" className="section-img" />
                            <div className="p-0 ms-2 pt-2">
                                <p className="m-0 h4 fw-bold">Snacks</p>
                                <p className="m-0  small text-muted ">Start your day with exclusive breakfast options</p>

                            </div>
                        </div> */}
                    </div>
                    {/* <!-- second row --> */}
                    {/* <div className="row justify-content-between">
                        <div className=" col-4 border border-1 ps-0 d-flex setwidth set-border mb-3">
                            <img src="Images/4.png" className="section-img" />
                            <div className="p-0 ms-2 pt-2">
                                <p className="m-0 h4 fw-bold">Dinner</p>
                                <p className="m-0  small text-muted ">Start your day with exclusive breakfast options</p>
                            </div>
                        </div>
                        <div className=" col-4 border border-1 ps-0 d-flex setwidth set-border mb-3">
                            <img src="Images/5.png" className="section-img" />
                            <div className="p-0 ms-2 pt-2">
                                <p className="m-0 h4 fw-bold">Drinks</p>
                                <p className="m-0  small text-muted ">Start your day with exclusive breakfast options</p>
                            </div>
                        </div>
                        <div className=" col-4 border border-1 ps-0 d-flex set-border setwidth mb-3">
                            <img src="Images/6.png" className="section-img" />
                            <div className="p-0 ms-2 pt-2">
                                <p className="m-0 h4 fw-bold">Nightlife</p>
                                <p className="m-0  small text-muted ">Start your day with exclusive breakfast options</p>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </section>
    </>
}

export default QuickSearch;

