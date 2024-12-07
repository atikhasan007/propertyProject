import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { BiTrash } from 'react-icons/bi';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { IoIosImages } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { categories, facilities, types } from '../assets/data';
import Footer from '../components/Footer';
import Header from '../components/Header';







const CreateListing = () => {

 const [category, setCategory] = useState("");
 const [type, setType] = useState("");
 const [amenities, setAmenities] = useState([])
 const [photos , setPhotos] = useState([])
 const creatorId = useSelector((state)=> state.user._id)


 //address and location 
 const [formLocation, setFormLocation] = useState({
    streetAddress: "",
    aptSuite:"",
    city:"",
    province:"",
    country:"",
 })

const handleChangeLocation = (e)=>{
    const {name, value} = e.target
    setFormLocation({
        ...formLocation,
        [name]:value,
    })
}




 //count
 const [guestCount , setGuestCount] = useState(1)
 const [bedroomCount , setBedroomCount] = useState(1)
 const [bedCount , setBedCount] = useState(1)
 const [bathroomCount , setBathroomCount] = useState(1)

const navigate = useNavigate()




 const handleSelectAmenities = (facility)=>{
    if(amenities.includes(facility)){
        setAmenities((prevAmenities)=>
            prevAmenities.filter((option)=>option!==facility))
    }else{
        setAmenities((prev)=>[...prev, facility])
    }
 }





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

//formDescription 
const [formDescription , setFormDescription ] = useState({
    title:"",
    description:"",
    price:0,
});

const handleChangeDescription = (e) =>{
    const {name, value} = e.target;
    setFormDescription({
        ...formDescription,
        [name]:value,
    });
};
//======================================================================================================


//crate a property function 
const handlePost = async (e) => {
  e.preventDefault();

  // Check for missing required fields
  if (!category || !type) {
    console.error("Category or Type is missing.");
    alert("Please fill out all required fields.");
    return;
  }

  try {
    const listingForm = new FormData();
    listingForm.append("creator", creatorId);
    listingForm.append("category", category);
    listingForm.append("type", type);
    listingForm.append("streetAddress", formLocation.streetAddress || "");
    listingForm.append("aptSuite", formLocation.aptSuite || "");
    listingForm.append("city", formLocation.city || "");
    listingForm.append("province", formLocation.province || "");
    listingForm.append("country", formLocation.country || "");
    listingForm.append("guestCount", guestCount || 0);
    listingForm.append("bedroomCount", bedroomCount || 0);
    listingForm.append("bedCount", bedCount || 0);
    listingForm.append("bathroomCount", bathroomCount || 0);
    listingForm.append("amenities", amenities || []);
    listingForm.append("title", formDescription.title || "");
    listingForm.append("description", formDescription.description || "");
    listingForm.append("price", formDescription.price || 0);

    photos.forEach((photo) => listingForm.append("listingPhotos", photo));

    for (const pair of listingForm.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    const response = await fetch("http://localhost:7000/listing/create", {
      method: "POST",
      body: listingForm,
    });

    if (response.ok) {
      navigate("/");
    } else {
      const errorData = await response.json();
      console.log("Error:", errorData);
    }
  } catch (err) {
    console.error("Public Listing failed:", err.message);
  }
};





//============================================================================================



  return (
     <>
     <Header />
     <section className='py-10 bg-gray-100'>
     <h3 className="text-4xl font-bold py-6  text-center text-gray-800 mb-6" >Add a Property</h3>
         <form onSubmit={handlePost}>
         <h4 className="text-2xl font-medium text-gray-700 mb-6">Describe Your Property?</h4>
            {/* Categories Container */}
            <div className="flex gap-4 bg-white ring-1 ring-gray-200 shadow-md rounded-full px-4 py-2 overflow-x-auto scrollbar-hide max-w-5xl mx-auto">
        {categories.map((item) => (
          <div
            key={item.label}
            onClick={()=>setCategory(item.label)}

              




            className="flex flex-col items-center gap-2 p-3 rounded-lg 
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
            <div className=' flex flex-col  xl:flex-row gap-8 mt-8'>
                <div className='flex-1'>
                    {/* Types of place */}
                    <h4 className='font-semibold text-xl text-gray-800 mb-4'>What is the type of your place?</h4>

                    <div className='space-y-4'>
                        {types.map((item)=>(
                           
                           
                           <div
                           key={item.name}
                           onClick={() => setType(item.name)}
                           className={`flex items-center justify-between px-4 py-3 border rounded-lg cursor-pointer ${
                             type === item.name
                               ? "bg-blue-50 border-blue-400"
                               : "hover:bg-blue-300 border-gray-200"
                           }`}
                         >
                           <div>


                                    <h5 className='text-lg font-semibold text-gray-700'>{item.name}</h5>
                                    <p className="text-sm text-gray-500">{item.description}</p>
                                </div>

                                <div className='text-2xl text-gray-600'>{item.icon}</div>
                            </div>
                        ))}
                    </div>

                </div>
                {/* place location */}
                <div className='flex-1 mb-6'>
                    <h4 className="font-semibold text-center text-2xl text-gray-800 mb-4"> What's the address of your place?</h4>
                    <div className='space-y-4 mb-3'>
                        <div>
                            <h5 className='text-xl font-semibold mb-4'>Street Address</h5>
                            <input onChange={handleChangeLocation}
                             value={formLocation.streetAddress}
                            type='text' name="streetAddress"
                            placeholder='Street' required 
                           className="w-full border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-400"
                            />

                        </div>
                         </div>


                          
                          <div className='flex gap-6 '>
                            <div className='w-1/2'> 
                                <h5 className='text-xl font-semibold mb-4'>Apartment, Suite (opt):</h5>
                                <input
                                onChange={handleChangeLocation}
                                value={formLocation.aptSuite}

                                type='text'
                                name="aptSuite"
                                placeholder='Apt, Suite (opt)'
                                required
                                className="w-full border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-400"
                                />
                            </div>
                            <div className='w-1/2'>
                                <h5 className='text-xl font-semibold mb-4'>City:</h5>
                                <input
                                onChange={handleChangeLocation}
                                value={formLocation.city}
                                type='text'
                                name="city"
                                placeholder='city'
                                required
                             className="w-full border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-400"
                                />
                            </div>
                         </div>
                        




                         <div className='flex gap-6'>
                            <div className='w-1/2'> 
                                <h5 className='text-xl font-semibold mb-4 pt-2'>Province:</h5>
                                <input
                                onChange={handleChangeLocation}

                                value={formLocation.province}
                                type='text'
                                name="province"
                                placeholder='province'
                                required
                                className="w-full border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-400"
                                />
                            </div>
                            <div className='w-1/2'>
                                <h5 className='text-xl font-semibold mb-4 pt-2'>Country:</h5>
                                <input
                                onChange={handleChangeLocation}
                                value={formLocation.country}
                                type='text'
                                name="country"
                                placeholder='Country'
                                required
                                 className="w-full border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-400"
                                />
                            </div>
                         </div>




                </div>
            </div>



{/*  essentials */}
<h4 className="text-2xl font-medium text-gray-800 mt-8 mb-4">Provide some essential details about your place?</h4>



<div className="flex flex-wrap gap-6 mb-8">
  {/* Guests */}
  <div className="flex flex-col items-center bg-white shadow-lg p-6 rounded-xl border border-gray-200 w-40">
    <h5 className="text-lg font-medium text-gray-700 mb-4">Guests</h5>
    <div className="flex items-center gap-4">
      <FaMinus
        onClick={() => {
          guestCount > 1 && setGuestCount(guestCount - 1);
        }}
        className="h-8 w-8 p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full cursor-pointer"
      />
      <p className="text-xl font-semibold text-gray-800">{guestCount}</p>
      <FaPlus
        onClick={() => {
          setGuestCount(guestCount + 1);
        }}
        className="h-8 w-8 p-2 bg-blue-500 text-white hover:bg-blue-600 rounded-full cursor-pointer"
      />
    </div>
  </div>

  {/* Bedrooms */}
  <div className="flex flex-col items-center bg-white shadow-lg p-6 rounded-xl border border-gray-200 w-40">
    <h5 className="text-lg font-medium text-gray-700 mb-4">Bedrooms</h5>
    <div className="flex items-center gap-4">
      <FaMinus
        onClick={() => {
          bedroomCount > 1 && setBedroomCount(bedroomCount - 1);
        }}
        className="h-8 w-8 p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full cursor-pointer"
      />
      <p className="text-xl font-semibold text-gray-800">{bedroomCount}</p>
      <FaPlus
        onClick={() => {
          setBedroomCount(bedroomCount + 1);
        }}
        className="h-8 w-8 p-2 bg-blue-500 text-white hover:bg-blue-600 rounded-full cursor-pointer"
      />
    </div>
  </div>

  {/* Beds */}
  <div className="flex flex-col items-center bg-white shadow-lg p-6 rounded-xl border border-gray-200 w-40">
    <h5 className="text-lg font-medium text-gray-700 mb-4">Beds</h5>
    <div className="flex items-center gap-4">
      <FaMinus
        onClick={() => {
          bedCount > 1 && setBedCount(bedCount - 1);
        }}
        className="h-8 w-8 p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full cursor-pointer"
      />
      <p className="text-xl font-semibold text-gray-800">{bedCount}</p>
      <FaPlus
        onClick={() => {
          setBedCount(bedCount + 1);
        }}
        className="h-8 w-8 p-2 bg-blue-500 text-white hover:bg-blue-600 rounded-full cursor-pointer"
      />
    </div>
  </div>
   
  {/* Bathrooms */}
  <div className="flex flex-col items-center bg-white shadow-lg p-6 rounded-xl border border-gray-200 w-40">
    <h5 className="text-lg font-medium text-gray-700 mb-4">Bathrooms</h5>
    <div className="flex items-center gap-4">
      <FaMinus
        onClick={() => {
          bathroomCount > 1 && setBathroomCount(bathroomCount - 1);
        }}
        className="h-8 w-8 p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full cursor-pointer"
      />
      <p className="text-xl font-semibold text-gray-800">{bathroomCount}</p>
      <FaPlus
        onClick={() => {
          setBathroomCount(bathroomCount + 1);
        }}
        className="h-8 w-8 p-2 bg-blue-500 text-white hover:bg-blue-600 rounded-full cursor-pointer"
      />
    </div>
  </div>
</div>



 <div className='my-10'>
       <h4 className='text-2xl my-6 font-semibold'>Describe about the features of your location?</h4>
       <ul className='flex items-center flex-wrap gap-3 mb-10'>
  {facilities.map((card) => (
    <li 
      key={card.name}
      onClick={() => handleSelectAmenities(card.name)}
      className={ `${amenities.includes(card.name)? 
        "ring-1 ring-secondary" : "ring-1 ring-slate-900/5"} flex items-center gap-3 bg-white p-4 rounded cursor-default` }
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
                                    );
                                })}

                                 <input type='file' id="imageUpload"
                                 accept='image/*'
                                 onChange={handleUploadPhotos}
                                 multiple
                                 className='hidden'
                                 />
                                 <label htmlFor='imageUpload'
                                 className='group flexCenter flex-col border-2 border-dashed
                                 border-gray-300 rounded-lg
                                 p-6 hover:bg-gray-100 transition-colors cursor-pointer
                                 '
                                 >
                                     <div className='h-52 w-full flexCenter'>
                                    <IoIosImages className='
                                    text-6xl text-gray-400 group-hover:text-gray-600
                                    transition-colors
                                    '/>
                                  </div>

                                  <p className='text-gray-500 group-hover:text-gray-700'>
                                    Upload more photos
                                  </p>
                                 </label>
                                </>
                            )}
                            {provided.placeholder}

                            

                        </div>
                    )}


                </Droppable>
              </DragDropContext>
              <h4 className='text-2xl font-semibold my-5'>How would your characterize the charm and excitement of your property?</h4>
              <div className=''>
                <h5 className='text-xl'>Title:</h5>
                <input 

                onChange={handleChangeDescription}

                 value={formDescription.title}

                type='text'
                 name='title' 
                 placeholder='Title'
                  required
                className='bg-white p-2 text-sm outline-none border-none mb-2 rounded w-full'
                />
                <h5 className='text-xl'>Description:</h5>
                <textarea 
                   onChange={handleChangeDescription}

                value={formDescription.description}
                name='description'
                rows={10}
                placeholder='Description'
                required
                 className='bg-white p-2 text-sm outline-none border-none mb-2 rounded w-full'
                />
                <input 
                   onChange={handleChangeDescription}
                  value={formDescription.price}
                type='number' name='price' placeholder='100' required
                 className='bg-white p-2 text-sm outline-none border-none mb-2 rounded w-full'
                />
              </div>
            </div>

            <button type='submit' className="w-full mt-8 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition mb-4">Create Property</button>
         </form>

         <Footer/>
         
     </section>
     
     </>
  );
};


export default CreateListing;






