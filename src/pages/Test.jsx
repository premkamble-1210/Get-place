import React, { useState, useEffect,useContext } from 'react';
import Meetingcard from '../components/Meetingcard';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { database } from '../firebase-config';
import { ref, set, push,onValue } from 'firebase/database';
import { Globlelogin } from "../App";

function Popupmodel({ isOpen, onClose, handledata }) {
  const [isPublic, setIsPublic] = useState(true);
  const [newdata, setNewdata] = useState({ roomName: '', isPublic: true, date: '', time: '' });
  const [error, setError] = useState({ roomName: false, date: false, time: false });

  const validateFields = () => {
    const newError = {
      roomName: newdata.roomName.trim() === '',
      date: newdata.date === '',
      time: newdata.time === '',
    };
    setError(newError);
    return !Object.values(newError).some((err) => err); // Returns true if no errors
  };

  const handlenewdata = () => {
    if (validateFields()) {
      handledata(newdata.roomName, isPublic, newdata.date, newdata.time);
    }
  };

  const handlechages = (e) => {
    setNewdata({ ...newdata, roomName: e.target.value });
    if (e.target.value.trim() !== '') setError((prev) => ({ ...prev, roomName: false }));
  };

  const handleDateChange = (e) => {
    setNewdata({ ...newdata, date: e.target.value });
    if (e.target.value !== '') setError((prev) => ({ ...prev, date: false }));
  };

  const handleTimeChange = (e) => {
    setNewdata({ ...newdata, time: e.target.value });
    if (e.target.value !== '') setError((prev) => ({ ...prev, time: false }));
  };

  const toggleState = () => {
    setIsPublic(!isPublic);
  };

  return (
    <Popup open={isOpen} modal nested onClose={onClose}>
      {(close) => (
        <div className="modal rounded-xl shadow-lg md:p-6 w-[90%] md:w-[99%] md:px-20 max-w-4xl mx-auto relative text-sm">
          {/* Close Button */}
          <button
            className="close cursor-pointer absolute top-[-10px] right-[-10px] text-xl leading-5 bg-white rounded-full border border-gray-300 p-1"
            onClick={close}
          >
            &times;
          </button>

          {/* Header */}
          <div className="header w-full border-b border-gray-300 text-lg font-semibold text-center py-1 text-2xl">
            <p className="bg-gradient-to-r from-[#E4C9F5] to-[#C55FF4] bg-clip-text text-transparent font-semibold text-3xl">
              Add New Room
            </p>
          </div>

          {/* Content */}
          <div className="content w-full py-2 px-1">
            <p className="mb-4 text-gray-700 md:text-xs text-xs hidden md:block">
              Enter the details for your new meeting room. All fields are required.
            </p>

            {/* Room Name Input */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Room Name"
                onChange={handlechages}
                value={newdata.roomName}
                className={`w-full border rounded-lg p-2 focus:outline-none focus:ring-2 ${
                  error.roomName ? 'border-red-500 focus:ring-red-500' : 'focus:ring-purple-400'
                }`}
              />
              {error.roomName && <p className="text-red-500 text-xs mt-1">Room name is required.</p>}
            </div>

            {/* Public/Private Toggle */}
            <div className="flex items-center gap-4 mb-4">
              <span className="text-gray-700">{isPublic ? 'Public' : 'Private'}</span>
              <button
                onClick={toggleState}
                className={`w-14 h-7 flex items-center rounded-full p-1 ${
                  isPublic ? 'bg-green-500' : 'bg-gray-400'
                } transition-colors duration-300 cursor-pointer`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                    isPublic ? 'translate-x-7' : 'translate-x-0'
                  }`}
                ></div>
              </button>
            </div>

            {/* Date Selector */}
            <div className="mb-4">
              <label htmlFor="date" className="block text-gray-700 font-medium mb-1">
                Select Date:
              </label>
              <input
                type="date"
                id="date"
                onChange={handleDateChange}
                value={newdata.date}
                min={new Date().toISOString().split("T")[0]}
                className={`w-full border rounded-lg p-2 focus:outline-none focus:ring-2 ${
                  error.date ? 'border-red-500 focus:ring-red-500' : 'focus:ring-purple-400'
                }`}
              />
              {error.date && <p className="text-red-500 text-xs mt-1">Date is required.</p>}
            </div>

            {/* Time Selector */}
            <div className="mb-4">
              <label htmlFor="time" className="block text-gray-700 font-medium mb-1">
                Select Time:
              </label>
              <input
                type="time"
                id="time"
                onChange={handleTimeChange}
                value={newdata.time}
                className={`w-full border rounded-lg p-2 focus:outline-none focus:ring-2 ${
                  error.time ? 'border-red-500 focus:ring-red-500' : 'focus:ring-purple-400'
                }`}
              />
              {error.time && <p className="text-red-500 text-xs mt-1">Time is required.</p>}
            </div>
          </div>

          {/* Actions */}
          <div className="actions w-full py-2 px-1 text-center flex justify-center gap-4">
            <button
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 cursor-pointer"
              onClick={close}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-gradient-to-r from-[#E4C9F5] to-[#C55FF4] text-white rounded-lg shadow-md hover:shadow-lg cursor-pointer"
              onClick={() => {
                if (validateFields()) {
                  handlenewdata();
                  close();
                }
              }}
            >
              Create Room
            </button>
          </div>
        </div>
      )}
    </Popup>
  );
}



function Test() {
  const { globalUser } = useContext(Globlelogin);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [date, setDate] = useState(null);

  const addSchedule = (schedule) => {
    const scheduleId = schedule.id; // Convert title to ID-friendly format
  const scheduleRef = ref(database, `GroupDiscussions/${scheduleId}`);

  set(scheduleRef, schedule)
    .then(() => console.log(`Schedule '${scheduleId}' added successfully`))
    .catch((error) => console.error('Error adding schedule:', error));
  };
  
  function randomID(len = 5) {
    const chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP';
    let result = '';
    for (let i = 0; i < len; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

 function handledata(roomName, isPublic,date,time) {
    console.log("Room Name: " + roomName);
    console.log("Public: " + isPublic);
    console.log("Date: " + date);
    console.log("Time: " + time); 
    const schedule = {
      id:randomID(5),
      title: roomName,
      isPublic: isPublic,
      date:date,
      time:time,
      owner:globalUser.firstName + " " + globalUser.lastName,
      Member:[`${globalUser.uid}`],
    
    };
    addSchedule(schedule);
  }

   useEffect(() => {
    const fetchSchedules = () => {
      const schedulesRef = ref(database, 'GroupDiscussions');
      onValue(schedulesRef, (snapshot) => {
        const data = snapshot.val();
        console.log('Schedules:', data);
    
        if (data) {
          const now = new Date(); // Get the current date and time
    
          // Convert the data object into an array and filter out past meetings
          const dataArray = Object.keys(data)
            .map((key) => ({
              id: key, // Use the Firebase key as ID
              ...data[key], // Spread the rest of the object properties
            }))
            .filter((item) => {
              const discussionDate = new Date(item.date + 'T' + item.time);
              return discussionDate >= now; // Keep only future discussions
            });
    
          // Sort the filtered array by date and time
          const sortedData = dataArray.sort((a, b) => {
            const dateA = new Date(a.date + 'T' + a.time);
            const dateB = new Date(b.date + 'T' + b.time);
            return dateA - dateB; // Sort ascending (earlier first)
          });
    
          console.log('Sorted Upcoming Group Discussions:', sortedData);
    
          // Update state with sorted data
          setDate(sortedData);
        }
      });
    };
    
    // Call this function to fetch schedules
    fetchSchedules();
   }, []);


  return (
    <div className="w-full h-full">
      {/* Trigger Button */}
      <div className="w-full h-43 flex justify-center items-center">
        <div className="w-[80%] h-full flex flex-col justify-center items-center text-center">
        <h1 className="text-2xl md:text-4xl font-bold text-gradient bg-gradient-to-r from-[#E4C9F5] to-[#C55FF4] bg-clip-text text-transparent">
    Group Discussions
  </h1>
  <p className="mt-2 text-sm md:text-lg text-gray-600 hidden md:block">
    Engage, collaborate, and share ideas in this interactive GD section.
  </p>
        </div>
        <div className="md:w-[20%] h-full flex justify-center items-center">
          <button
            className="w-40 h-12 bg-white rounded-xl flex justify-center items-center border-2 border-gradient-to-r from-[#E4C9F5] to-[#C55FF4] cursor-pointer"
            onClick={() => setPopupOpen(true)}
          >
            <p className="text-center bg-gradient-to-r from-[#E4C9F5] to-[#C55FF4] bg-clip-text text-transparent">
            Host a Session
            </p>
          </button>
        </div>
      </div>

      {/* Meeting Cards */}
      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-2">
        {date &&
          Object.values(date).map((schedule) => (
            <Meetingcard key={schedule.id} id={schedule.id} title={schedule.title} isPublic={schedule.isPublic} date={schedule.date} time={schedule.time} owner={schedule.owner}/>
          ))}
      </div>

      {/* Popup Model */}
      <Popupmodel isOpen={isPopupOpen} onClose={() => setPopupOpen(false)} handledata={handledata} />
    </div>
  );
}

export default Test;
