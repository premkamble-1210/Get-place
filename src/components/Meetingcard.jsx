import React from 'react';
import { NavLink } from 'react-router-dom';


function Meetingcard({ id, title, isPublic, date, time, owner }) {
  const colors = ['bg-yellow-400', 'bg-green-400', 'bg-blue-400', 'bg-indigo-400', 'bg-purple-400'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  const randomImage = [
    "https://img.freepik.com/premium-vector/3d-jigsaw-puzzle-pieces-symbol-teamwork-problemsolving-business-challenge-hand-people-connection-jigsaw-puzzle-partnership-concept-3d-teamwork-idea-icon-vector-render-illustration_412828-1237.jpg",
    "https://img.freepik.com/premium-vector/recycle-symbol-green-leaves-with-green-background_43880-444.jpg",
    "https://img.freepik.com/premium-vector/3d-protected-medical-shield-concept-with-atom-molecules-isolate-light-blue-background_36059-494.jpg",
    "https://img.freepik.com/premium-vector/3d-hand-holding-social-media-icons-online-social-communication-applications-concept-emoji-hearts-chat-light-pink-background-3d-vector-illustration_145666-1639.jpg",
  ];

  const randomImageIndex = Math.floor(Math.random() * randomImage.length);
  const randomImageSrc = randomImage[randomImageIndex];

  // Check if the meeting can be joined and calculate remaining time
  const calculateRemainingTime = () => {
    const meetingDateTime = new Date(`${date}T${time}`);
    const currentTime = new Date();

    const timeDifference = meetingDateTime - currentTime; // Difference in milliseconds
    const minutesRemaining = Math.floor(timeDifference / (1000 * 60));
    const hoursRemaining = Math.floor(minutesRemaining / 60);
    const minutesLeft = minutesRemaining % 60;

    const canJoin = timeDifference >= 0 && minutesRemaining <= 5; // ±5 minutes window for joining

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
        <div className="space-y-2 mb-16">
          <div className="flex items-center">
            <i className="fa-solid fa-calendar-days text-white text-lg"></i>
            <p className="text-white text-xl ml-2 font-semibold">{date}</p>
          </div>
          <div className="flex items-center">
            <i className="fa-solid fa-clock text-white text-lg"></i>
            <p className="text-white text-xl ml-2 font-semibold">{time} </p>
          </div>
          <div className="flex items-center">
            <i className="fa-solid fa-user text-white text-lg"></i>
            <p className="text-white text-xl ml-2 font-semibold">{owner}</p>
          </div>
        </div>

        {/* Remaining Time */}
        {/* <p className="text-gray-300 text-sm">{`Time Remaining: ${timeRemaining}`}</p> */}
        <p className="text-gray-500 overflow-ellipsis text-xs">
          Tip: GD topic is <strong>AI</strong> generated*
        </p>
        {/* Join Button */}
        {canJoin ? (
          <NavLink
            to={`/Home/Rooms/${id}`}
            className="bg-green-500 text-white text-center px-4 py-2 rounded-lg mt-4"
          >
            Join GD
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
  );
}

export default Meetingcard;
