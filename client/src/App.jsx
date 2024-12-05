import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateListing from "./pages/CreateListing";
import Home from "./pages/Home";
import ListingDetails from "./pages/ListingDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";

 
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
         
       </Routes>

       </div>
     </BrowserRouter>
  ) 
}


export default App;