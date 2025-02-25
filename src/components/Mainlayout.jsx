import React from 'react';
import Sidebar from './Sidebar';
import Dashboard from '../pages/Dashboard';
import Test from '../pages/Test';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

function Mainlayout() { 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
  return (
    <div className="h-screen  w-full flex flex-col md:flex-row md:h-screen md:px-10 md:py-10 bg-gradient-to-r from-[#D5E3E7] via-[#EFF3CD] via-[#E4F2F6] to-[#D5E3E7] overflow-hidden">

      <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className='md:hidden  h-10 w-10 absolute right-8 top-5 flex items-center justify-center rounded-lg'>
        {isSidebarOpen ? <i class="fa-solid fa-xmark text-2xl"></i> :<i class="fa-solid fa-bars text-2xl"></i>}
      </button>
      <div 
        className={` md:w-1/4 md:w-[23%] ${isSidebarOpen ? 'block ' : 'hidden'} md:block rounded-lg w-[80%] h-full  border-r-2 border-black`} 
      >
        <Sidebar />
      </div>
      <div className={`flex-grow rounded-lg md:px-10 overflow-auto scroll-smooth ${!isSidebarOpen ? 'block ' : 'hidden'} `}>
      <Outlet/>

        
      </div>
    </div>
  );
}

export default Mainlayout;