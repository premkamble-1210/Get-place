import React, { useEffect, useState } from 'react';
import Navsections from './Navsections';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config"; 

function Sidebar() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    // Track authentication state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (!currentUser) {
                navigate('/'); // Redirect after logout confirmation
            }
        });
        return () => unsubscribe(); // Cleanup the listener
    }, [navigate]);

    const logOut = async () => {
        try {
            await signOut(auth);
            console.log("User logged out");
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    return (
        <div className="h-full flex flex-col transform transition duration-300 ease-in-out">
            <div className='w-full h-45 flex items-center justify-center'>
                <div className='w-[60%] h-full '>
                    <img src={logo} alt="" className='w-full h-full'/>
                </div>
            </div>
            <div className='w-full h-[70%] pt-5'>
                <Navsections catagery={"Dashboard"} logo={"fa-solid fa-terminal"} route={"Dashboard"}/>
                <Navsections catagery={"ATS"} logo={"fa-solid fa-ranking-star"} route={"ATS"}/>
                <Navsections catagery={"Apptitude"} logo={"fa-solid fa-brain"} route={"Apptitude"}/>
                <Navsections catagery={"Com-Q"} logo={"fa-solid fa-shuffle"} route={"Com-Q"}/>
                <Navsections catagery={"GD Rooms"} logo={"fa-solid fa-comments"} route={"GDrooms"}/>
                <Navsections catagery={"Interview"} logo={"fa-solid fa-user-group"} route={"Test3"}/>
                <Navsections catagery={"Discussion"} logo={"fa-brands fa-discord"} route={"Discussion"}/>

                <div 
                    className="w-[100%] h-[13%] px-2.5 flex justify-center items-center hover:bg-gradient-to-r from-[#E4C9F5] to-[#C55FF4] hover:bg-clip-text hover:text-transparent cursor-pointer"
                    onClick={logOut}
                >
                    <div className='w-[20%] h-full flex justify-center items-center'>
                        <i className="fa-solid fa-right-from-bracket text-2xl hover:bg-gradient-to-r from-[#E4C9F5] to-[#C55FF4] hover:bg-clip-text hover:text-transparent"></i>
                    </div>
                    <div className='w-[50%] h-full flex justify-start items-center ml-1.5'>
                        <p className="text-2xl hover:bg-gradient-to-r from-[#E4C9F5] to-[#C55FF4] hover:bg-clip-text hover:text-transparent">Logout</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
