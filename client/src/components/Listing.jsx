import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { categories } from '../assets/data';
import { setListings } from '../redux/state';
import ListingCard from "./ListingCard";

import Loader from './Loader';



const Listing = () => {

  const dispatch = useDispatch();
  const [loading , setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] =useState("All");
  const listings = useSelector((state)=> state.listings)






  const getQueryListings = async () =>{
    try{

      const response = await fetch( 
       selectedCategory !== "All" ?
      `http://localhost:7000//listing?
        category=${selectedCategory}` : 
      "http://localhost:7000/listing", {
        method: "GET",
      }
      )
      const  data = await response.json()
      dispatch(setListings({listings:data}))
      setLoading(false)
    }

    catch(err){
     console.log("Fetch Listings failed " , err.message);
    }
  }

  useEffect(() => {
    getQueryListings();
  }, [selectedCategory]);
  





  return (
    <section id="listing" className="py-16 bg-gray-300 rounded-sm">
      {/* Title */}
      <div className="text-center pb-12">
        <h6 className="text-orange-500 capitalize font-serif font-semibold text-lg tracking-wide">
          From concept to reality
        </h6>
        <h2 className="text-4xl font-bold capitalize text-gray-800">
          Discover our newest listings
        </h2>
      </div>

      {/* Categories Container */}
      <div
        className="flex gap-x-4 bg-white ring-1 ring-gray-200 shadow-md 
                   rounded-full px-6 py-4 overflow-x-auto 
                   scrollbar-hide max-w-5xl mx-auto"
      >
        {categories.map((category) => (
          <div
            key={category.label}

            onClick={()=>setSelectedCategory(category.label)}
            className="flex flex-col items-center gap-3 p-3 rounded-lg 
                       cursor-pointer min-w-[6rem] xl:min-w-[8rem] 
                       transition-transform duration-300 hover:scale-105 hover:shadow-lg"
            style={{ flexShrink: 0 }}
          >
            <div
              className="text-secondary rounded-full h-16 w-16 flex items-center justify-center text-xl font-bold"
              style={{ backgroundColor: `${category.color}` }}
            >
              {category.icon}
            </div>
            <p className={ `${category.label ===selectedCategory? "text-gray-600" : "" } text-sm font-medium `}>{category.label}</p>
          </div>
        ))}
      </div>




{/* propertied / listing */}
{loading ? (
  <Loader />
) : (
  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
    {listings.map(({
      _id,
      creator,
      listingPhotoPaths,
      city,
      province,
      country, // Fixed typo: changed `coutry` to `country`
      category,
      type,
      price,
      title,
      description
    }) => (
      <ListingCard
        key={_id}
        listingId={_id}
        creator={creator}
        listingPhotoPaths={listingPhotoPaths}
        city={city}
        province={province}
        country={country}
        category={category}
        type={type}
        price={price}
        title={title}
        description={description}
      />
    ))}
  </div>
)}



      
    </section>
  );
};

export default Listing;
