const express = require("express");
const router = express.Router();

const restaurant = require("../Controllers/RestaurantController");
const location = require("../Controllers/locationController");
const meal_type = require("../Controllers/MealTypeControllers");
const menu_items = require("../Controllers/MenuItemsControllers");
const users = require("../Controllers/UserControllers");
const payment = require("../Controllers/PaymentController");
const cuisine =require("../Controllers/cusineControllers");
router.get("/home",restaurant.home);

router.get("/api/restaurant",restaurant.getrestaurantlist);

router.get("/api/get-restaurant-details-by-id/:id",restaurant.getRestaurantDetailsById);


// location
router.get("/api/get-location",location.getlocationlist);
router.get("/api/get-restaurant-by-location-id/:loc_id",restaurant.getRestaurantListByLocId);


// mealtypes
router.get("/api/get-meal-types",meal_type.getMealTypeList);

// cuisines list
router.get("/api/get-cuisines",cuisine.getcuisinelist)
// getting menuitems
router.get("/api/get-menu-item-list-by-restaurant-id/:res_id",menu_items.getMenuItemListByRestID)

// Using post
router.post("/api/login",users.login)
router.post("/api/sign-up",users.signUp)

// using filter data
router.post("/api/filter",restaurant.filterData);
router.post("/api/payment/gen-order",payment.getOrderId);
router.post("/api/payment/verify",payment.verifyPayment);
module.exports=router;



