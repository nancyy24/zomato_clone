import { Route, Routes } from "react-router-dom";
import HomePage from "./components/home/HomePage";
import SearchPage from "./components/search/SearchPage";
import RestaurantPage from "./components/restaurant/RestaurantPage"

// import "./css/filterPage.css"
// import "./css/homePage.css";
// import "./src/css/filterPage.css"
// import "./src/css/homePage.css"
function App(){

    return (<>
      <main className="container-fluid">
      <Routes>
      <Route path="/" element={ <HomePage/>}/>
      <Route path="/search-page/:meal_id" element={ <SearchPage/>}/>
      <Route path="/restaurant/:id" element={<RestaurantPage/>} />
        </Routes>
      </main>
    </>);
}

export default App;
