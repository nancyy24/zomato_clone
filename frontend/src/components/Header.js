import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider} from "@react-oauth/google";
import {GoogleLogin} from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";


function Header(props){
  let navigate = useNavigate();
  let [given_name,setgiven_name]= useState("");
  let [email,setEmail]=useState("")
  let [mobile,setMobile]=useState("")
  let [password,setPassword]=useState("")


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

let [userLogin,setUserLogin] = useState(getTokenDetails());

  let onSuccess = (credentialResponse)=>
  {
    let token = credentialResponse.credential;
    let data = jwt_decode(token);
    // console.log(data);
    // save the data
    localStorage.setItem("auth-token",token);
    Swal.fire({
      icon: 'success',
      title: 'Login Successfully ',
      text: 'Welcome to Zomato!',
    })
    .then(()=>
    { 
      window.location.reload();

    })
    
    // alert('user login successfully');
  };

  
  let onError =() =>{
    // alert("Login fail");
    Swal.fire({
      icon: 'error',
      title: 'Login Failed!!',
      text: 'Something went wrong!',
      footer: '<a href="">Why do I have this issue?</a>'
    })
  };

  let logout =() =>
  {
    // remove the adta from the local storage
    localStorage.removeItem("auth-token");
    // alert("User Logout Successfully");
    Swal.fire({
      icon: 'success',
      title: 'User Logout Successfully ',
      text: 'LogOut to Zomato Site!',
    })
    .then(()=>
    { 
      setUserLogin(false);
      window.location.reload();

    })
    
    
   

  }

  let f_name =(e)=>{
    setgiven_name(e.target.value)
    console.log(given_name)
  }
  let email_id = (e) =>{
    setEmail(e.target.value)
    console.log(email)

  }

  let mobile_no =(e)=>{
    setMobile(e.target.value)
    console.log(mobile)
  }

  let pwd =(e) =>{
    setPassword(e.target.value)
    console.log(pwd)
  }

  let body_message = {
    given_name : given_name,
    email:email,
    mobile:mobile,
    password:password
  }
  let submit_details =async ()=>{
var {data} = await axios.post("http://localhost:5000/api/sign-up",body_message);
console.log(data)
if(data.status === true)
{
  // alert("Order Placed Successfully");
  Swal.fire({
    icon: 'success',
    title: 'Created Account Successfully!!',
    text: 'Now You Can Order Your Favourite Food ',
  })
  .then(() =>
  {
    window.location.replace("/");

  })}
// setEmail("")
// setgiven_name("")
// setMobile("")
// setPassword("")

  }

let login_msg = {
  email:email,
  password:password
}

  let submit_login_details = async () =>{
    var {data} = await axios.post("http://localhost:5000/api/login",login_msg)
    console.log(data)
    console.log(data.result)
    console.log(data.token)
    localStorage.setItem("auth-token",data.token);
    console.log(jwt_decode(data.token))
    if(data.status === true)
{
  // alert("Order Placed Successfully");
  Swal.fire({
    icon: 'success',
    title: 'User Login Successfully',
    text: 'Now You Can Order Your Favourite Food',
  })
  .then(() =>
  {
    window.location.replace("/");

  })}
    // console.log(userToken);
    // localStorage.setItem("auth-token",userToken);
    // console.log(userLogin);
    // console.log(jwt_decode(userToken));

// setPassword("")
// setEmail("")
// navigate("/");



  }
    return (<>


    
<GoogleOAuthProvider clientId ="67689682803-lk4a458n1sgcidj63m0bf5l92mmslbgv.apps.googleusercontent.com">
{/* Login */}
<div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Sign-In</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body d-flex justify-content-center flex-column">
      
        <div class="form-floating mb-3">
         <input type="email" class="form-control " id="floatingInput" onChange={email_id} value={email} placeholder="Enter Email Address" />
         <label for="floatingInput" >Email Address</label>
        </div>
        <div class="form-floating mb-3">
      <input type="password" class="form-control " id="floatingInput" onChange={pwd} value={password} placeholder="Enter Password" />
        <label for="floatingInput" >Password</label>
        </div>
        <button type="button" className="btn btn-primary " onClick={submit_login_details} 
        // onDoubleClick={() =>{
        //     navigate("/")
        //   }}
          >Submit</button>
       
        <div className="text-danger text-center fw-bolder fs-4 my-3" >
          OR
        </div>
        <div className="  d-flex justify-content-center fs-2 fw-bolder">
        <GoogleLogin onSuccess ={onSuccess}
        onerror={onError}
        
        />
        </div>
      </div>
     
    </div>
  </div>
</div>
{/* create Account */}

<div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="staticBackdropLabel">Sign Up</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
   
      <div className="modal-body">
   <div class="form-floating mb-3">
  <input type="text" class="form-control " id="floatingInput" value={given_name} onChange={f_name} placeholder="Enter FullName" />
  <label for="floatingInput" >Full Name</label>
</div>
      <div class="form-floating mb-3">
  <input type="email" class="form-control " id="floatingInput" value={email} onChange={email_id} placeholder="Enter Email-Address" />
  <label for="floatingInput" >Email address</label>
</div>
  <div class="form-floating mb-3">
  <input type="number" class="form-control " id="floatingInput" value={mobile}onChange={mobile_no} placeholder="Enter Mobile Number" />
  <label for="floatingInput" >Mobile Number</label>
</div>
<div class="form-floating">
  <input type="password" class="form-control" id="floatingPassword" value={password} onChange={pwd} placeholder="Enter Password" />
  <label for="floatingPassword" >Password</label>
</div>
      </div>
      <div className="modal-footer d-flex flex-column" >
        {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
        <button type="button" className="btn btn-primary" onClick={submit_details}>Submit</button>
        <p className="pull-right" >Already registered <span className="text-danger">Go to Login Option!!</span></p>
      </div>
    </div>
  </div>
</div>

         <header className="row">
      <div className={"col-12  p-2 " + props.color}>
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <p className="m-0 logo d-flex justify-content-center cursor-pointer align-items-center fw-bold fs-4" onClick={() =>{
            navigate("/")
          }}>
            e!
          </p>
          { userLogin ? ( <div className="d-flex">
            <p className="mt-2 me-3 fw-bold text-white">Welcome, {userLogin.given_name}</p>
            <button className="btn btn-outline-light" onClick={logout}>Logout</button>
          </div>) : (
            
            <div>
            <button className="btn text-white" data-bs-toggle="modal" data-bs-target="#exampleModal">Login</button>
            <button className="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Create An account</button>
          </div>
          )}
           
        </div>
      </div>
    </header>
</GoogleOAuthProvider>
    </>);
}

export default Header;