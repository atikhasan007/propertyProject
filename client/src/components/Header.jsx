

import React, { useState } from 'react';
import { FaSearch, FaUser } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { setLogout } from '../redux/state';




const Header = ()  => {
    const [menuOpened, setMenuOpened] = useState(false);
    const [dropdownMenu, setDropdownMenu] = useState(false);
    const user = useSelector((state)=>state.user)
    const navigate = useNavigate();
    const dispatch = useDispatch()
 
    const toggleMenu = () =>{
     setMenuOpened(!menuOpened)
    }
 
 
   return (
     <header className="pl-4 pr-4 py-4 flex justify-between items-center  bg-slate-300">
       {/* Logo */}
       <Link to={"/"} className="font-bold text-2xl">
         <div>
           Property<span className="text-secondary">Plus</span>
         </div>
       </Link>

       {/* Search Bar */}
       <div className="bg-white ring-1 ring-slate-900/5 rounded-full p-2 px-4 w-44 sm:w-96 flex items-center gap-x-2 relative">
         <input
           type="text"
           placeholder="Search here.."
           className="outline-none border-none w-full bg-white"
         />
         <button
           className="h-10 w-12 rounded-full bg-secondary text-white flex items-center justify-center cursor-pointer"
         >
           <FaSearch />
         </button>
       </div>
 
       {/* Dropdown menu */}
       <div className='justify-between  gap-x-10'>
           <div onClick={()=>setDropdownMenu(!dropdownMenu)} className='cursor-pointer relative'>
             <div>
              {!user ? (
                  <FaUser />

              ):(
                <img 
                  src={`http://localhost:7000/${user.profileImagePath.
                  replace(
                    "public",
                    ""
                  )}`}
                  alt="" 
                  height={47}
                  width={47}
                  className='rounded-full object-cover aspect-square'
                  />
              )}
            </div>
            {dropdownMenu && !user && (
              
              <div className='absolute top-16 right-0 w-40 p-4 rounded-3xl bg-white 
              text-gray-30 medium-14 flex flex-col gap-y-2 shadow-md z-50
              ' >
                 <Link to={"/login"}>Login</Link>
                 <Link to={"/register"}>Sign Up</Link>
              </div>
            )}

            {dropdownMenu && user && (
              <div className='absolute top-16 right-0 w-40 p-4 rounded-3xl bg-yellow-100 
              text-gray-50 font-thin medium-14 flex flex-col gap-y-2 shadow-md z-50
              
              '>
                 <Link to={"/create-listing"}>Add a Property</Link>
                 <Link to={`${user._id}/trips`}>Trip List</Link>
                 <Link to={`${user._id}/wishlist`}>Wish List</Link>
                 <Link to={`${user._id}/listing`}>Property List</Link>
                 <Link to={`${user._id}/reservation`}>Reservation List</Link>


                 <Link
                  to={"/login"}
                   onClick={()=>{
                  dispatch(setLogout());
                  }}
                  >
                    Log out
                    </Link>
              </div>

            )}


           </div>
       </div>
     </header>
  );
};


export default Header;
