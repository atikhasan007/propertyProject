import React from 'react';
import { BiSelectMultiple } from "react-icons/bi";
import { GrCertificate } from "react-icons/gr";
import { MdOutlineQuestionAnswer } from "react-icons/md";
const  Features =()=> {
  return (
     <section className='py-16 xl:py-32'>
         {/* title */}
         <div className='text-center pb-16'>
            <h6 className='capitalize font-serif font-semibold'>Few Steps to your new home</h6>
            <h2 className='text-4xl  font-bold capitalize'>This is how easy it can be</h2>
         </div>

         <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12'>
            <div className='bg-white p-4 rounded-3xl'>
                <MdOutlineQuestionAnswer className='bold-32 mb-3 text-secondary'/>
                <h4 className='text-2xl'>Answer Questions</h4>
                <p>Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. debitis tenetur dolorem alias 
                    illum perspiciatis.
                </p>
            </div>

            <div className='bg-white p-4 rounded-3xl '>
                <BiSelectMultiple className='bold-32 mb-3 text-yellow-500'/>
                <h4 className='text-2xl'>Select Property</h4>
                <p>Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. debitis tenetur dolorem alias 
                    illum perspiciatis.
                </p>
            </div>

            <div className='bg-white p-4 rounded-3xl'>
                <GrCertificate className='bold-32 mb-3 text-red-500'/>
                <h4 className='text-2xl'>Enjoy Living</h4>
                <p>Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. debitis tenetur dolorem alias 
                    illum perspiciatis.
                </p>
            </div>



         </div>
     </section>
  );
};
export default  Features;
