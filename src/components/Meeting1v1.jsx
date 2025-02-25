import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { database } from '../firebase-config';
import { ref, update, onValue } from 'firebase/database';
import { generateContent } from '../Model'; 
import {useNavigate} from 'react-router-dom'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Button, Typography, Box, CircularProgress } from "@mui/material";
import { useContext } from 'react';
import { Globlelogin } from "../App";

// 
function PopupModel({ isOpen, onClose, resume1, resume2, onUpload }) {
  const [uploading, setUploading] = useState({ resume1: false, resume2: false });

  const handleFileUpload = async (event, resumeKey) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading((prev) => ({ ...prev, [resumeKey]: true }));

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "posts123");
    data.append("cloud_name", "dgmnl7ox7");

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dgmnl7ox7/upload", {
        method: "POST",
        body: data,
      });
      const result = await res.json();
      onUpload(resumeKey, result.secure_url);
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setUploading((prev) => ({ ...prev, [resumeKey]: false }));
    }
  };

  return (
    <Popup open={isOpen} modal nested onClose={onClose}>
      <Box p={3} textAlign="center">
        <Typography variant="h5" gutterBottom>
          Resume Preview
        </Typography>

        <Box display="flex" justifyContent="center" gap={2}>
          {/* Resume 1 */}
          <Box
            width="45%"
            height="400px"
            border="1px solid #ccc"
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
          >
            {resume1 ? (
            <img
            src={resume1}
            alt="Resume 1"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              transition: "transform 0.3s ease-in-out",
              cursor: "zoom-in"
            }}
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.5)")}
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          />
          
            ) : (
              <>
                <Typography variant="body1" color="error">
                  No Resume 1 Uploaded
                </Typography>
                {uploading.resume1 ? (
                  <CircularProgress size={24} />
                ) : (
                  <Button variant="contained" component="label">
                    Upload Resume 1
                    <input type="file" hidden accept="application/png" onChange={(e) => handleFileUpload(e, "resume1")} />
                  </Button>
                )}
              </>
            )}
          </Box>

          {/* Resume 2 */}
          <Box
            width="45%"
            height="400px"
            border="1px solid #ccc"
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
          >
            {resume2 ? (
             <img
             src={resume2}
             alt="Resume 2"
             style={{
               width: "100%",
               height: "100%",
               objectFit: "contain",
               transition: "transform 0.3s ease-in-out",
               cursor: "zoom-in"
             }}
             onMouseEnter={(e) => (e.target.style.transform = "scale(1.5)")}
             onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
           />
           
            ) : (
              <>
                <Typography variant="body1" color="error">
                  No Resume 2 Uploaded
                </Typography>
                {uploading.resume2 ? (
                  <CircularProgress size={24} />
                ) : (
                  <Button variant="contained" component="label">
                    Upload Resume 2
                    <input type="file" hidden accept="application/png" onChange={(e) => handleFileUpload(e, "resume2")} />
                  </Button>
                )}
              </>
            )}
          </Box>
        </Box>

        <Button variant="contained" color="primary" onClick={onClose} sx={{ mt: 2 }}>
          Close
        </Button>
      </Box>
    </Popup>
  );
}

// 
function getUrlParams(url = window.location.href) {
    let urlStr = url.split('?')[1];
    return new URLSearchParams(urlStr);
  }
  
  function randomID(len = 5) {
    const chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP';
    let result = '';
    for (let i = 0; i < len; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
  
function Meeting1v1() {
  const { globalUser } = useContext(Globlelogin);

     const { id } = useParams();
      const [AppId, setAppId] = useState(null);
      const [ServerSecret, setServerSecret] = useState(null);
      const meetingContainerRef = useRef(null);
      const [isPopupOpen, setPopupOpen] = useState(false);
      const [resumes, setResumes] = useState({ resume1: null, resume2: null });

  const handleUpload = (key, fileUrl) => {
    setResumes((prev) => ({ ...prev, [key]: fileUrl }));
   
    handleUpload123( fileUrl);

  };

  useEffect(() => {
    console.log('Fetching interview data...');
    const interviewsRef = ref(database, "1vs1interveiw");

    onValue(interviewsRef, (snapshot) => {
      const data = snapshot.val();
      console.log('Interview data:', data);
      if (data) {
        // Find the interview entry that matches the given ID
        const matchedEntry = Object.entries(data).find(([key, value]) => value.id === id);
        if (matchedEntry) {
          const interviewData = matchedEntry[1];
          setResumes({
            resume1: interviewData.resume1=="null"?null:interviewData.resume1,
            resume2: interviewData.resume2=="null"?null:interviewData.resume2,
          });
          console.log('Interview data:', interviewData.resume1);
        }
      }
    });
  }, []);
      

  const handleUpload123 = (fileUrl) => {
    const interviewsRef = ref(database, "1vs1interveiw");
  
    onValue(interviewsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Find the entry with the matching ID
        const matchedEntry = Object.entries(data).find(([key, value]) => value.id === id);
  
        if (matchedEntry) {
          const interviewKey = matchedEntry[0]; // Firebase key for the matched entry
          const interviewData = matchedEntry[1]; // The actual data object
  
          // Determine where to save the file
          let fieldToUpdate = interviewData.resume1 === "null" ? "resume1" : "resume2";
  
          // Update in Firebase
          const resumeRef = ref(database, `1vs1interveiw/${interviewKey}`);
          update(resumeRef, { [fieldToUpdate]: fileUrl })
            .then(() => console.log(`${fieldToUpdate} updated successfully in Firebase`))
            .catch((error) => console.error(`Error updating ${fieldToUpdate}:`, error));
  
          // Update local state
          setResumes((prev) => ({ ...prev, [fieldToUpdate]: fileUrl }));
        }
      }
    }, { onlyOnce: true }); // Prevent multiple triggers
  };
  
    
      // Function to fetch API keys from Firebase
      const fetchSchedules = () => {
        console.log('Fetching API keys...');
        const schedulesRef = ref(database, 'apikeys');
        onValue(
          schedulesRef,
          (snapshot) => {
            const data = snapshot.val();
            // console.log('API keys:', );
            Object.values(data).map((item) => {
              console.log('API keys:',item);
              if(item){
                setAppId(item.appID);
              setServerSecret(item.serverSecret);
              }else{
                console.log('API keys not found in the database');
              }
            });
            
          },
          (error) => {
            console.error('Error fetching API keys:', error);
          }
        );
      };
     const [GDtopic, setGDtopic] = useState('');
     const genratedGDtopic = async () => {
      try {
        const prompt = 'Suggest a simple and engaging group discussion topic like "Silver economy", "Data embassy", "Should India allow dual citizenship?", "The future of space defence", "Doomscrolling", "Digital divide", "Agriculture 4.0", "Satellite internet", "La Nina" that encourages different perspectives and is suitable for beginners.under 20 words and only 1 topic.give each time new topic';
    
        // const res = await generateContent(prompt); // Assume generateContent is an API function
        console.log("Full API response:",''); 
    
    setGDtopic("Should India allow dual citizenship?");
      } catch (error) {
        console.error('Error generating content:', error);
      }
    };
    
    
    
      useEffect(() => {
        fetchSchedules();
        genratedGDtopic();
      }, []); // Run only once on mount
    
      useEffect(() => {
        if (!AppId || !ServerSecret) return; // Wait until API keys are fetched
    
        const roomID = getUrlParams().get('roomID') || randomID(5);
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
          AppId,
          ServerSecret,
          id,
          randomID(5),
          globalUser.reloadUserInfo.displayName
        );
    
        const zp = ZegoUIKitPrebuilt.create(kitToken);
    
        // Join the room with additional features
        zp.joinRoom({
          container: meetingContainerRef.current,
          scenario: {
            mode: ZegoUIKitPrebuilt.OneONoneCall, //
          },
          sharedLinks: [
            {
              name: 'Copy Link',
              url: `${window.location.origin}/Home/Rooms/${id}`,
            },
          ],
          maxUsers:2,
          onLeaveRoom: () => {
            
          }
          ,
          onJoinRoom: () => {
            
          },
          
        });
    
        // Cleanup on component unmount
        return () => {
          zp.destroy();
        };
      }, [id, AppId, ServerSecret]); // Re-run whenever API keys or id changes
    
    
      const [time, setTime] = useState(1800); // Initialize timer with 15 minutes (900 seconds)
      const [dengertime, setDengertime] = useState(false);
      const navigate = useNavigate()
      // Countdown timer logic
      useEffect(() => {
        const timer = setInterval(() => {
          setTime((prevTime) => {
            if (prevTime <= 0) {
              clearInterval(timer);
              navigate('/Home/Test3');
    
              return 0;
            }else if(prevTime == 10){
              // alert('Time is about to end');
              setDengertime(true);
              
            }
            return prevTime - 1;
          });
        }, 1000);
    
        return () => clearInterval(timer); // Cleanup timer
      }, []);
    
      // Format time as mm:ss
      const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
      };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
          <div className='h-20 w-[80%]  rounded-2xl p-1.5 mb-1.5 flex justify-center items-center'>
          
          {/* Second div (countdown timer) */}
          <div className={"flex justify-center items-center w-[20%]  h-[100%] rounded-2xl p-1.5 ml-10 "+(dengertime?'bg-red-100':'bg-red-400')}>
            <p className={`md:text-2xl `+(dengertime?'text-red-500':'text-white')}>{formatTime(time)}</p>
          </div>
          <button onClick={() => setPopupOpen(true)} className='flex justify-center items-center w-[10%]  h-[100%] rounded-2xl p-1.5 ml-10 bg-blue-400 cursor-pointer'>
          <i class="fa-solid fa-file text-white md:text-xl"></i>
          

          </button>
            
          </div>
          <div ref={meetingContainerRef} className="w-[80%] h-[70%] rounded-2xl " />
          <PopupModel
        isOpen={isPopupOpen}
        onClose={() => setPopupOpen(false)}
        resume1={resumes.resume1}
        resume2={resumes.resume2}
        onUpload={handleUpload}
      />
    
        </div>
  )
}

export default Meeting1v1