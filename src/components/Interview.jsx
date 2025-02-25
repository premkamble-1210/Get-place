import React from 'react';
import { NavLink } from 'react-router-dom';

function Interview({ id, title, isPublic, date, time, owner,Roll }) {

    const colors = ['bg-yellow-400', 'bg-green-400', 'bg-blue-400', 'bg-indigo-400', 'bg-purple-400'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
  
    const randomImage = [
        "https://img.freepik.com/free-vector/meeting-background-with-business-women_23-2147608191.jpg?ga=GA1.1.469876599.1718812616&semt=ais_hybrid",
        "https://img.freepik.com/free-vector/one-one-meeting-concept-illustration_114360-24592.jpg?ga=GA1.1.469876599.1718812616&semt=ais_hybrid",
        "https://img.freepik.com/premium-photo/comic-insights-interviews-office-chatter-illustration_641878-1396.jpg?ga=GA1.1.469876599.1718812616&semt=ais_hybrid",
        "https://img.freepik.com/free-vector/hand-drawn-business-meeting_23-2147676812.jpg?ga=GA1.1.469876599.1718812616&semt=ais_hybrid",
        ];
  
    const randomImageIndex = Math.floor(Math.random() * randomImage.length);
    const randomImageSrc = randomImage[randomImageIndex];
  
    // Check if the meeting can be joined
    const calculateRemainingTime = () => {
      const meetingDateTime = new Date(`${date}T${time}`);
      const currentTime = new Date();
  
      const timeDifference = meetingDateTime - currentTime; // Difference in milliseconds
      const minutesRemaining = Math.floor(timeDifference / (1000 * 60));
      const hoursRemaining = Math.floor(minutesRemaining / 60);
      const minutesLeft = minutesRemaining % 60;
  
      const canJoin = timeDifference >= 0 && minutesRemaining <= 30; // ±5 minutes window for joining
  
      return {
        canJoin,
        timeRemaining: timeDifference > 0
          ? `${hoursRemaining > 0 ? `${hoursRemaining}h ` : ''}${minutesLeft}m`
          : 'Meeting started',
      };
    };
  
    const { canJoin, timeRemaining } = calculateRemainingTime();
  
  
  return (
    <div
      className={`w-full h-[300px] rounded-xl p-1.5 md:w-[400px] md:h-[300px] border-2 border-white flex ${randomColor}`}
    >
      {/* Left Side: Text Content */}
      <div className="w-2/3 p-4 flex flex-col justify-between">
        {/* Header Section */}
        <div className="mb-2">
          <p className="text-3xl text-white font-bold">{title}</p>
        </div>

        {/* Details Section */}
        <div className="space-y-2 mb-5">
          <div className="flex items-center">
            <i className="fa-solid fa-calendar-days text-white text-lg"></i>
            <p className="text-white text-xl ml-2 font-semibold">{date}</p>
          </div>
          <div className="flex items-center">
            <i className="fa-solid fa-clock text-white text-lg"></i>
            <p className="text-white text-xl ml-2 font-semibold">{time}</p>
          </div>
          <div className="flex items-center">
            <i className="fa-solid fa-user text-white text-lg"></i>
            <p className="text-white text-xl ml-2 font-semibold">{owner}</p>
          </div>
          <div className="flex items-center">
         
            <i className="fa-solid fa-arrow-right-arrow-left text-white text-lg"></i>
            <p className="text-white text-xl ml-2 font-semibold">{Roll}</p>
          </div>
        </div>

        {/* Tip Section */}
        <p className="text-gray-500 overflow-ellipsis text-xs">
          Tip:Do not shear your <strong>personal</strong> information
        </p>

        {/* Join Button */}
        {canJoin ? (
          <NavLink
            to={`/Home/Test3/${id}`}
            className="bg-green-500 text-white text-center px-4 py-2 rounded-lg mt-4"
          >
            attend interview
          </NavLink>
        ) : (
          <p className="text-red-500 mt-4 text-sm">Remaining {timeRemaining}</p>
        )}
      </div>

      {/* Right Side: Image */}
      <div className="w-1/3 h-full rounded-r-xl overflow-hidden">
        <img src={randomImageSrc} className="w-full h-full object-cover" alt="Meeting" />
      </div>
    </div>
  )
}

export default Interview