import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import circle from "../assets/circle.png";
import client1 from "../assets/person-1.jpg";
import client2 from "../assets/person-2.jpg";
import sideImg from "../assets/sideImg.png";
import sideImg1 from "../assets/sideImg1.png";
import sideImg2 from "../assets/sideImg2.png";
const Hero = () => {


  const user = useSelector((state)=>state.user)




  return (
  <section className='max-padd-container  mt-16 xl:mt-10' >
    <div className='flex flex-col xl:flex-row gap-16'>
        {/* left */}
        <div className='flex justify-center flex-1 flex-col gap-y-8 
        xl:max-w-[555px] relative
        '>
            <h1  
            className='font-bold text-4xl'
            >Invest in <span className='text-secondary'>Your Future</span> with <br/> confidence</h1>
       
        <p>Find Houses for Any Budget — Explore luxury houses, 
            apartments, and villas. Invest in prime Dubai real 
            estate today. Modern homes, exclusive apartments, and 
            villas. Make the smart investment today.
        </p>
        <div className='flex gap-3' >
            <a href='#listing' className=' bg-slate-900  text-slate-100 rounded-full flexCenter p-3 pr-5 pl-5' >Explore Properties</a>

            
            {user ?(
                <Link to={"/create-listing"}  className=' bg-slate-500  text-slate-100 rounded-full flexCenter p-3 pr-5 pl-5'><span className='medium-20 pr-1'>+</span>Add Property</Link>
            ):(
              <Link to={"/login"}  className=' bg-slate-500  text-slate-100 rounded-full flexCenter p-3 pr-5 pl-5'><span className='medium-20 pr-1'>+</span>Add Property</Link>
            )}



           
        </div>
        <div className='flex relative'>
            {/*client image */}
             <img src={circle} alt="" className='rounded-full h-[99px]   left-16  z-30'/>
             <img src={client1} alt=""className='rounded-full h-[80px] shadow-sm absolute left-16  z-20'/>
             <img src={client2} alt=""className='rounded-full h-[80px] shadow-sm absolute left-32 z-10 '/>

        </div>
        </div>

    {/* Right Side */}
    <div className="flex flex-1 flex-col gap-6">
  {/* Main Image */}
  <div className="rounded-3xl overflow-hidden shadow-lg">
    <img 
      src={sideImg} 
      alt="Luxury Property" 
      className="rounded-3xl object-cover w-full h-[400px] transition-transform duration-300 hover:scale-105" 
    />
  </div>

  {/* Smaller Images */}
  <div className="flex gap-6">
    <div className="flex-1 h-[266px] rounded-2xl overflow-hidden shadow-md">
      <img 
        src={sideImg1} 
        alt="Modern Apartment" 
        className="object-cover h-full w-full transition-transform duration-300 hover:scale-105" 
      />
    </div>
    <div className="flex-1 h-[266px] rounded-2xl overflow-hidden shadow-md">
      <img 
        src={sideImg2} 
        alt="Villa Exterior" 
        className="object-cover h-full w-full transition-transform duration-300 hover:scale-105" 
      />
    </div>
  </div>
</div>






    </div>
  </section>
  )
}

export default Hero;