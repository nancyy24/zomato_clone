const express=require("express");
const mongoose = require("mongoose");

const app=express();

const APIRouter =require("./Routes/APIRoutes");

// importing the cors instance
const cors = require("cors");
const PORT = process.env.PORT || 5000;
// const URL= "mongodb://127.0.0.1:27017/batch48";
const URL = `mongodb+srv://zomato-app:zomato-app@edureka.ild8fi0.mongodb.net/batch48?retryWrites=true&w=majority`


app.use(cors());   //to enable cors request
// using  to access the post data
app.use(express.json());   //converting the string json data to pure json data
app.use(express.urlencoded({extended:false})); // normal post data to json data
app.use("/",APIRouter);

console.log("connecting to db");
mongoose.connect(URL).then(()=>{
    app.listen(PORT,() => {
        // console.log("database connected"
        console.log("app is running ",PORT);
    });
}).catch((error)=>{
    console.log(error);
});
