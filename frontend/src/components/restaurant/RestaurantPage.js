import Header from "../Header";
import RestaurantPageContent from "./RestaurantPageContent";
import "../../css/restaurantPage.css"

function RestaurantPage(){
    return <>
        <Header color="bg-danger"/>
        <RestaurantPageContent/>
    </>
}

export default RestaurantPage;