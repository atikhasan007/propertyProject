import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
           // console.log('Image path:', imgPath); // Log to debug
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
      </div>


      {/* title and description info*/}
      <div className='max-sm:px-2'>
         <h4 className='text-2xl font-semibold' >{title}</h4>
         <div className='font-bold pb-2'>{category}</div>
         <h5 className='flex items-center gap-x-2 capitalize medium-15'>{<HiOutlineLocationMarker/>}
         {city} , {province}, {country}
         </h5>
         <div className='mt-2'>
            <div>
                <span className='text-secondary font-semibold text-xl'>	৳ {price}</span>
                <span className='medium-14'>/ night</span>
            </div>
            <div className='medium-15 font-serif font-semibold capitalize py-1'>{type}</div>

         </div>
         <p className='line-clamp-4'>{description}</p>
      </div>

      



    </div>
  );
};

export default ListingCard;
