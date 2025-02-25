import React from 'react'
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Navsections({logo,catagery,route}) {
  const [isActive, setIsActive] = useState(false);
  return (
   <NavLink to={"/Home/"+route} className={({ isActive }) => isActive ?setIsActive(true):setIsActive(false)}>
     <div className={`w-[100%] h-[13%]  px-2.5 flex justify-center items-center hover:bg-gradient-to-r from-[#E4C9F5] to-[#C55FF4] hover:bg-clip-text hover:text-transparent `}>
        <div className='w-[20%] h-full  flex justify-center items-center'>
    
        <i class={`${logo} text-2xl hover:bg-gradient-to-r from-[#E4C9F5] to-[#C55FF4] hover:bg-clip-text hover:text-transparent ${isActive ? 'bg-gradient-to-r from-[#E4C9F5] to-[#C55FF4] bg-clip-text text-transparent ':'' }`}></i>
        </div>
        <div className='w-[50%] h-full  flex justify-start items-center ml-1.5'>
            <p className={`text-2xl hover:bg-gradient-to-r from-[#E4C9F5] to-[#C55FF4] hover:bg-clip-text hover:text-transparent ${isActive ? 'bg-gradient-to-r from-[#E4C9F5] to-[#C55FF4] bg-clip-text text-transparent ':'' }`}>{catagery}</p>
        </div>

    </div>
   </NavLink>
  )
}


export default Navsections