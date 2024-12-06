import React, { useEffect, useState } from 'react';
import { FaPersonShelter } from "react-icons/fa6";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { MdBed, MdOutlineBathroom, MdOutlineBedroomChild } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Loader from '../components/Loader';



const ListingDetails = () => {
 const [loading , setLoading] = useState(true)
 const {listingId} = useParams()
 const [listing, setListing] = useState(null);

 

 const getListingDetails = async () =>{
  try{
    const response = await fetch(`http://localhost:7000/listing/${listingId}`,{
      method:"GET"
    })
    const data = await response.json()
    setListing(data)
    setLoading(false)

  }catch(err){
    console.log("Fetch Listing Details failed ", err.message)

  }
  
 }




 useEffect(()=>{
  getListingDetails()
 },[])

  return loading ? (<Loader/>):(
   <>
    <Header/>
    <section>
      {/* left side */}
      <div>
         <div>
                <h3>{listing.title}</h3>
                <span><HiOutlineLocationMarker /></span>
                <p>{listing.type}, {listing.city} , {listing.province}, {listing.country}</p>
        
         <div>
          <span><FaPersonShelter />
          <p>{listing.guestCount} guests</p>
          </span>
          <span><MdOutlineBedroomChild />
          <p>{listing.bedroomCount} bedrooms</p>
          </span>
          <span><MdBed />
          <p>{listing.bedCount} beds</p>
          </span>
          <span><MdOutlineBathroom />
          <p>{listing.bathroomCount } bathrooms</p>
          </span>
         </div>

          <div>
          
          </div>
          <img
          src={`http://localhost:7000/${listing?.creator?.profileImagePath?.replace(
            "public",
            ""
          )}`}
          alt="creator"
          height={44}
          width={44}
          className='rounded-full object-fit-cover'
          
/>
           <h5>Hosted by {listing.creator.firstName} {listing.creator.lastName}</h5>

      </div>
      <p>{listing.description}</p>
      </div>
      
    </section>
   </>
  );
};


export default ListingDetails;
