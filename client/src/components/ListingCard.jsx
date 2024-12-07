import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { GoHeart, GoHeartFill } from "react-icons/go";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setWishList } from '../redux/state';
const ListingCard = ({
  listingId,
  creator,
  listingPhotoPaths,
  city,
  province,
  country, 
  category,
  type,
  price,
  title,
  description,
  startDate,
  endDate,
  totalPrice,
  booking,

}) => {

const [currentIndex,setCurrentIndex] = useState(0);
const navigate = useNavigate()
const dispatch = useDispatch()



const goToPrevSlide = () =>{
    setCurrentIndex(
        (prevIndex) =>
        (prevIndex-1 + listingPhotoPaths.length)%
        listingPhotoPaths.length
    )
}


const goToNextSlide = () =>{
    setCurrentIndex(
        (prevIndex) =>
        (prevIndex + 1 + listingPhotoPaths.length)%
        listingPhotoPaths.length
    );
};


///code here  wishList
const user = useSelector((state)=>state.user)
const wishList = user?.wishList || []
const isLiked = wishList?.find((item)=>item?._id === listingId)
const patchWishList  = async () =>{
  if(user?._id !==creator._id){
    const response = await fetch(`http://localhost:7000/users/${user?._id}/${listingId}`,{
      method: "PATCH",
      headers:{
        "Content-Type" : "application/json",

      }
    })
    const data = await response.json()
    dispatch(setWishList(data.wishList))
  }else{
    return 
  }
}


//code end here wishList




  return (




    <div 

    onClick={() => navigate(`/listing/${listingId}`)}
   

    
    className='grid grid-cols-1 xl:grid-cols-2 gap-6
    place-items-center ring-1 ring-slate-900/5 bg-white  
    cursor-pointer p-2.5 rounded-[2.5] relative group
    '>
      {/* images */}
      <div  className='overflow-hidden relative'>
        <div className='flex' style={{transform:`translateX(-${currentIndex * 100}%)`}}>
          {listingPhotoPaths?.map((photo, i) => {
            const imgPath = `http://localhost:7000/uploads/${photo.split('/').pop()}`;
           
            return (
              <div key={i} className='relative flex-none w-full h-[266px] 
              
              items-center
              
              '>
                <img 
                  src={imgPath} 
                  alt={`Photo ${i + 1}`} 
                  className='h-full w-full rounded-[2rem]'
                  onError={(e) => e.target.src = '/path/to/fallback-image.jpg'} // Fallback image
                />


                {/* arrow */}

                <div className='opacity-0 group-hover:opacity-100 
                
                transition-opacity duration-1000
                
                '>
                    <div>
                        <FaArrowLeft
                        
                        onClick={(e)=>{
                            e.stopPropagation()
                            goToPrevSlide(e)
                        }}
                        className='absolute top-1/2  left-2.5
                        transform -translate-y-1/2 
                        p-1.5 text-2xl rounded-full border-none cursor-pointer flexCenter 
                        bg-white/30 text-white z-50 

                        
                        '/>
                     </div>


                     <div>
                        <FaArrowRight 
                        
                        onClick={(e)=>{
                            e.stopPropagation()
                            goToNextSlide(e)
                        }}
                        className='absolute top-1/2 right-2.5
                        transform -translate-y-1/2 
                        p-1.5 text-2xl rounded-full border-none cursor-pointer flexCenter 
                        bg-white/30 text-white z-50 

                        
                        '/>
                    </div>
                </div>



              </div>
            );
          })}
        </div>




      {/* Heart Icon */}
<button
  onClick={(e) => {
    e.stopPropagation();
    patchWishList();
  }}
  disabled={!user} 
  className={`absolute top-3 right-5 border border-white h-7 rounded-full flexCenter ${
    !user ? "opacity-50 cursor-not-allowed" : ""
  }`}
>
  {isLiked ? (
    <GoHeartFill className="text-white text-lg" /> 
  ) : (
    <GoHeart className="text-lg text-white" /> 
  )}
</button>







{/* heart icon  end */}




      </div>


      {/* title and description info*/}
      <div className='max-sm:px-2'>
         <h4 className='text-2xl font-semibold' >{title}</h4>
         <div className='font-bold pb-2'>{category}</div>
         <h5 className='flex items-center gap-x-2 capitalize medium-15'>{<HiOutlineLocationMarker/>}
         {city} , {province}, {country}
         </h5>
         <div className='mt-2'>

         
          {!booking ?(
            <>
              <div>
                <span className='text-secondary font-semibold text-xl'>	৳ {price}</span>
                <span className='medium-14'>/ night</span>
              </div>
              <div className='medium-15 font-serif font-semibold capitalize py-1'>{type}</div>

            </>
          ):(
            <div className='pb-3 pt-1'>
              <p className='pt-1'>{startDate}-{endDate}</p>
              <p className='pt-1'><span className='text-secondary bold-22'>
                ${totalPrice}
                </span></p>
            </div>
          )}



          
         </div>
         <p className='line-clamp-4'>{description}</p>
      </div>

      



    </div>
  );
};

export default ListingCard;






