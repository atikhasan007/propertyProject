import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { BiTrash } from 'react-icons/bi';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import { IoIosImages } from 'react-icons/io';
import { categories, facilities, types } from '../assets/data';
import Header from '../components/Header';





const CreateListing = () => {

 const [category, setCategory] = useState("");
 const [type, setType] = useState("");
 const [photos , setPhotos] = useState([])

 //count
 const [guestCount , setGuestCount] = useState(1)
 const [bedroomCount , setBedroomCount] = useState(1)
 const [bedCount , setBedCount] = useState(1)
 const [bathroomCount , setBathroomCount] = useState(1)
 const handleUploadPhotos= (e)=>{
    const newPhotos = e.target.files 
    setPhotos((prevPhotos)=>[...prevPhotos, ...newPhotos])
 }



 const handleDragPhoto =(result)=>{
    if(!result.destination) return ;
    const items = Array.from(photos)
    const [reorderedItem] = items.splice(result.source.index , 1)
    items.splice(result.destination.index , 0 , reorderedItem)
    
    setPhotos(items)
 }





 const handleRemovePhoto = (indexToRemove) => {
    setPhotos((prevPhotos) =>
        prevPhotos.filter((_, index) => index !== indexToRemove)
    );
};





const handlePost = async (e)=>{
    e.preventDefault()

}





  return (
     <>
     <Header />
     <section className='py-10'>
         <h3 className='text-3xl font-semibold py-0'>Add a Property</h3>
         <form onSubmit={handlePost}>
            <h4 className='text-xl py-2 px-1 my-5'>Describe Your Property?</h4>
            {/* Categories Container */}
      <div
        className="flex gap-x-4 bg-white ring-1 ring-gray-200 shadow-md 
                   rounded-full px-6 py-4 overflow-x-auto 
                   scrollbar-hide max-w-5xl mx-auto"
      >
        {categories.map((item) => (
          <div
            key={item.label}
            onClick={()=>setCategory(item.label)}

              




            className="flex flex-col items-center gap-3 p-3 rounded-lg 
                       cursor-pointer min-w-[6rem] xl:min-w-[8rem] 
                       transition-transform duration-300 hover:scale-105 hover:shadow-lg"
            style={{ flexShrink: 0 }}
          >
            <div
              className="text-secondary rounded-full h-16 w-16 flex items-center justify-center text-xl font-bold"
              style={{ backgroundColor: `${item.color}` }}
            >
              {item.icon}
            </div>

            
            <p className={`${category===item.label ?
                "text-secondary" : ""
            }  text-sm font-medium text-gray-600`}>{item.label}</p>


            
          </div>
        ))}
          </div>

          {/* container types and location */}
            <div className='flex-col flex xl:flex-row gap-x-16'>
                <div className='flex-1'>
                    {/* Types of place */}
                    <h4 className='font-bold text-xl my-5'>What is the type of your place?</h4>

                    <div className='flex flex-col gap-y-3 mb-6'>
                        {types.map((item)=>(
                            <div key={item.name} className={`${ type ===item.name? 

                                "ring-1 ring-slate-900/50 " : "ring-1 ring-slate-5" 
                            } justify-between max-w-[777px] rounded-xl px-4 py-1`}>
                                <div>
                                    <h5 className='text-5xl'>{item.name}</h5>
                                    <p>{item.description}</p>
                                </div>

                                <div className='text-2xl'>{item.icon}</div>
                            </div>
                        ))}
                    </div>

                </div>
                {/* place location */}
                <div className='flex-1 mb-4'>
                    <h4 className='text-4xl my-4'> What's the address of your place?</h4>
                    <div>
                        <div>
                            <h5 className='text-5xl'>Street Address</h5>
                            <input type='text' name="streetAddress"
                            placeholder='Street' required 
                            className='bg-white text-sm outline-none border-none
                            mb-2 rounded
                            '
                            />

                        </div>
                         </div>


                          
                          <div className='flex gap-6'>
                            <div className='w-1/2'> 
                                <h5 className='w-1/2'>Apartment, Suite (opt):</h5>
                                <input
                                type='text'
                                name="aptSuite"
                                placeholder='Apt, Suite (opt)'
                                required
                                className='bg-white text-sm outline-none border-none
                            mb-2 rounded'
                                />
                            </div>
                            <div className='w-1/2'>
                                <h5 className='w-1/2'>City:</h5>
                                <input
                                type='text'
                                name="city"
                                placeholder='city'
                                required
                                className='bg-white text-sm outline-none border-none
                            mb-2 rounded'
                                />
                            </div>
                         </div>
                        




                         <div className='flex gap-6'>
                            <div className='w-1/2'> 
                                <h5 className='w-1/2'>Province:</h5>
                                <input
                                type='text'
                                name="province"
                                placeholder='province'
                                required
                                className='bg-white text-sm outline-none border-none
                            mb-2 rounded'
                                />
                            </div>
                            <div className='w-1/2'>
                                <h5 className='w-1/2'>Country:</h5>
                                <input
                                type='text'
                                name="country"
                                placeholder='Country'
                                required
                                className='bg-white text-sm outline-none border-none
                            mb-2 rounded'
                                />
                            </div>
                         </div>




                </div>
            </div>



{/*  essentials */}
<h4 className='text-x4 my-4'>Provide some essential details about your place?</h4>


<div className='flex flex-wrap gap-4 mb-6'>
     <div className='justify-center gap-x-4 ring-1 ring-slate-900/5 p-2 rounded'>
        <h5 >Guests</h5>
        <div className='justify-center gap-x-2 bg-white'>
            <FaMinus
            onClick={()=>{
                guestCount > 1 && setGuestCount(guestCount-1);
            }}
            className='h-6 w-6 text-xl p-1 rounded cursor-pointer'
            />
            <p>{guestCount}</p>
            <FaPlus
            onClick={()=>{
                setGuestCount(guestCount+1)
            }}
             className='h-6 w-6 text-xl bg-secondary text-white p-1 rounded cursor-pointer'
            />
        </div>
     </div>


     <div className='justify-center gap-x-4 ring-1 ring-slate-900/5 p-2 rounded'>
        <h5 >Bedrooms</h5>
        <div className='justify-center gap-x-2 bg-white'>
            <FaMinus
            onClick={()=>{
                bedroomCount > 1 && setBedroomCount(bedroomCount-1);
            }}
            className='h-6 w-6 text-xl p-1 rounded cursor-pointer'
            />
            <p>{bedroomCount}</p>
            <FaPlus
            onClick={()=>{
                setBedroomCount(bedroomCount+1)
            }}
             className='h-6 w-6 text-xl bg-secondary text-white p-1 rounded cursor-pointer'
            />
        </div>
     </div>

     <div className='justify-center gap-x-4 ring-1 ring-slate-900/5 p-2 rounded'>
        <h5 >beds</h5>
        <div className='justify-center gap-x-2 bg-white'>
            <FaMinus
            onClick={()=>{
                bedCount > 1 && setBedCount(bedCount-1);
            }}
            className='h-6 w-6 text-xl p-1 rounded cursor-pointer'
            />
            <p>{bedCount}</p>
            <FaPlus
            onClick={()=>{
                setBedCount(bedCount+1)
            }}
             className='h-6 w-6 text-xl bg-secondary text-white p-1 rounded cursor-pointer'
            />
        </div>
     </div>
     <div className='justify-center gap-x-4 ring-1 ring-slate-900/5 p-2 rounded'>
        <h5 >bathrooms</h5>
        <div className='justify-center gap-x-2 bg-white'>
            <FaMinus
            onClick={()=>{
                bathroomCount > 1 && setBathroomCount(bathroomCount-1);
            }}
            className='h-6 w-6 text-xl p-1 rounded cursor-pointer'
            />
            <p>{bathroomCount}</p>
            <FaPlus
            onClick={()=>{
                setBathroomCount(bathroomCount+1)
            }}
             className='h-6 w-6 text-xl bg-secondary text-white p-1 rounded cursor-pointer'
            />
        </div>
     </div>

</div>


 <div className='my-10'>
       <h4 className='text-4xl my-4'>Describe about the features of your location?</h4>
       <ul className='flex items-center flex-wrap gap-3 mb-10'>
  {facilities.map((card) => (
    <li 
      key={card.name}
      onClick={() => {}}
      className='ring-1 ring-slate-900 flex items-center gap-3 bg-white p-4 rounded cursor-default'
    >
      <div>{card.icon}</div>
      <p>{card.name}</p>
    </li>
  ))}
</ul>

            {/* upload images */}
            <h4 className='text-4xl my-6'>Include images showcasing your property ?</h4>
              <DragDropContext onDragEnd={handleDragPhoto}>
                <Droppable droppableId='photos' direction='horizontal'>
                    {(provided)=>(
                        <div className='
                        grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5
                        xl:grid-cols-6 gap-4 p-4 bg-gray-50 rounded-lg shadow-lg'
                        
                        {...provided.droppableProps}
                        ref = {provided.innerRef}
                        >

                            {photos.length < 1 && (
                                <>
                                <input
                                type='file'
                                name='image'
                                accept='image/*'
                                onChange={handleUploadPhotos}
                                multiple
                                id="imageUpload"
                                className='hidden'
                                />
                                <label htmlFor='imageUpload' className='group
                                flex flex-col items-center justify-center
                                border-2 border-dashed border-gray-300 rounded-lg p-6
                                hover:bg-gray-100 transition-colors cursor-pointer
                                
                                '>
                                  <div className='h-52 w-full flexCenter'>
                                    <IoIosImages className='
                                    text-6xl text-gray-400 group-hover:text-gray-600
                                    transition-colors
                                    '/>
                                  </div>

                                  <p className='text-gray-500 group-hover:text-gray-700'>
                                    Upload from your device
                                  </p>

                                </label>
                                </>
                            )}


                            {photos.length >= 1 && (
                                <>
                                {photos.map((photo, index)=>{
                                    return (
                                        <Draggable key={index}
                                        draggableId={index.toString()}
                                        index={index}
                                        >
                                            {(provided)=>(
                                                <div 
                                                ref={provided.innerRef}
                                                {...provided.dragHandleProps}
                                                {...provided.dragHandleProps}
                                                className='relative group'

                                                
                                                >
                                                    <img src={URL.createObjectURL(photo)} alt='property'
                                                    className='aspect-square object-contain 
                                                    h-52 w-ful rounded-lg shadow-md'
                                                    
                                                    />

                                                    <button type='button' 
                                                    className='absolute top-2 right-2 bg-white
                                                    
                                                    p-1 rounded-full shadow-md hover:bg-gray-200
                                                    
                                                    'onClick={()=>handleRemovePhoto(index)}>
                                                        <BiTrash className='text-red-600'/>
                                                    </button>

                                                </div>
                                            )}
                                        </Draggable>
                                    )
                                })}
                                </>
                            )}



                        </div>
                    )}


                </Droppable>
              </DragDropContext>


            </div>
         </form>
     </section>
     
     </>
  );
};


export default CreateListing;