import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateListing from "./pages/CreateListing";
import Home from "./pages/Home";
import ListingDetails from "./pages/ListingDetails";
import Login from "./pages/Login";
import PropertyList from "./pages/PropertyList";
import Register from "./pages/Register";
import ReservationList from "./pages/ReservationList";
import Search from "./pages/Search";

import TripList from "./pages/TripList";
import WishList from "./pages/WishList";
 
const App=()=> {
  return (
     <BrowserRouter>
  
     <div className=" text-[#404040] bg-white ">


       <Routes>
         <Route path="/" element={<Home/>}/>
         <Route path="/register" element={<Register/>}/>
         <Route path="/login" element={<Login/>}/>
         <Route path="/create-listing" element={<CreateListing/>}/>
         <Route path="/listing/:listingId" element={<ListingDetails/>}/>


         <Route path="/listing/search/:search" element={<Search />}/>


         <Route path="/:userId/trips" element={<TripList />}/>
         <Route path="/:userId/wishlist" element={<WishList />}/>
         <Route path="/:userId/listing" element={<PropertyList/>}/>
         <Route path="/:userId/reservations" element={<ReservationList />} />
         
       </Routes>

       </div>
     </BrowserRouter>
  ) 
}


export default App;



