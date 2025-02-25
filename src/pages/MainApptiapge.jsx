import React from 'react';
import { NavLink } from 'react-router-dom';
function MainAptiPage() {
  return (
    <div className="h-full w-full flex justify-center items-center  p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Give Test Card */}
        <NavLink to='/Home/Test' >
        
        <div className="bg-white p-6 rounded-2xl shadow-lg text-center cursor-pointer hover:scale-105 transition-transform w-64 mx-auto">
          <img 
            src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png" 
            alt="Give Test" 
            className="w-20 mx-auto mb-3"
          />
          <h2 className="text-xl font-semibold text-gray-800">Give Test</h2>
          <p className="text-gray-600 text-sm mt-2">Challenge yourself with a quick test!</p>
        </div>
        </NavLink>

        {/* Add Aptitude Q Card */}
        <NavLink to='/Home/Add_Q' >
        <div className="bg-white p-6 rounded-2xl shadow-lg text-center cursor-pointer hover:scale-105 transition-transform w-64 mx-auto">
          <img 
            src="https://cdn-icons-png.flaticon.com/512/2910/2910766.png" 
            alt="Add Aptitude Qs" 
            className="w-20 mx-auto mb-3"
          />
          <h2 className="text-xl font-semibold text-gray-800">Add Aptitude Q</h2>
          <p className="text-gray-600 text-sm mt-2">Share your own aptitude questions with others!</p>
        </div>
        </NavLink>
        
      </div>
    </div>
  );
}

export default MainAptiPage;
