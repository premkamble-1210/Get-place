import React from 'react'
import { useContext,useState } from 'react';
import { Globlelogin } from "../App";
import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
function Dashnav() {
    const { globalUser } = useContext(Globlelogin);
    console.log("globalUser", globalUser.reloadUserInfo.displayName);
    const [sarech, setSarech] = useState('');
      const navigate = useNavigate();

      const handlesubmit = () => {
        if(sarech== 'Group Discussion' || sarech== 'group discussion' || sarech== 'GD' || sarech== 'gd'){
            navigate('/Home/GDrooms');
        }else if(sarech== 'Aptitude' || sarech== 'aptitude' || sarech== 'Apti' || sarech== 'apti'){
            navigate('/Home/Apptitude');
        }else if(sarech== 'Technical' || sarech== 'technical' || sarech== 'Tech' || sarech== 'tech' || sarech=='Leetcode' || sarech=='leetcode'){
            navigate('/Home/Com-Q');
        }else if(sarech== 'HR' || sarech== 'hr' || sarech== 'HR round' || sarech== 'hr round'){
            navigate('/Home/Test3');
        }else{
            navigate('/Home/Discussion');
        }
      };


  return (
    <div className='w-full h-45  flex '>
        <div className='md:w-[40%] h-full  flex-col w-full'>
            <div className='h-[40%] w-full  flex justify-start items-center mt-7'>
                <p className='md:text-4xl font-semibold text-2xl bg-gradient-to-r from-[#E4C9F5] to-[#C55FF4] bg-clip-text text-transparent'>Welcome {globalUser.reloadUserInfo.displayName}</p>
            </div>
            <div className='h-[20%] w-full '>
                <p className='text-xl text-gray-600'>Here is your dashboard</p>

            </div>


        </div>
        <div className='w-[60%] h-full  flex justify-space-between items-center'>
            <div className='w-full h-[40%]  md:flex justify-center items-center hidden md:block'>

                <div className='w-[50%] h-full bg-white rounded-2xl py-5 flex justify-center items-center'>

                <i class="fa-solid fa-magnifying-glass pr-3"></i>
                <input type="text" value={sarech} onKeyDown={(e) => e.key === 'Enter' && handlesubmit()} onChange={(e) => setSarech(e.target.value)} placeholder='Search' className='h-10 w-[80%] outline-none border-none rounded-lg'/>

                </div>
                <div className='w-[10%] h-full  flex justify-center items-center'>
                    <i class="fa-solid fa-bell text-2xl bg-gradient-to-r from-[#E4C9F5] to-[#C55FF4] bg-clip-text text-transparent"></i>
                </div>
                <div className='w-[40%] h-full  flex justify-center items-center'>

                    <Avatar alt="Remy Sharp" src={globalUser.reloadUserInfo.photoUrl} />

                </div>
            </div>


        </div>

    </div>
  )
}

export default Dashnav