import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { database } from '../firebase-config';
import { ref, onValue, get, update, set, push } from 'firebase/database';
import { generateContent } from '../Model'; 
import {useNavigate} from 'react-router-dom'
import { useContext } from 'react';
import { Globlelogin } from "../App";

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

function Meeting() {
  const { id } = useParams();
  const [AppId, setAppId] = useState(null);
  const [ServerSecret, setServerSecret] = useState(null);
  const meetingContainerRef = useRef(null);
 const { globalUser } = useContext(Globlelogin);

//  const currentmember =()=>{
//   const countRef = ref(database, `GroupDiscussions/${id}/count`);
//   get(countRef).
//  }
 
 const addMemberToSchedule = (newMember) => {
  const membersRef = ref(database, `GroupDiscussions/${id}/Member`);

  get(membersRef).then((snapshot) => {
    if (snapshot.exists()) {
      const currentMembers = snapshot.val();
      console.log("currentMembers----------->",currentMembers)
      if (!Object.values(currentMembers).includes(newMember)) {
        const newMemberKey = currentMembers.length===0? 0:currentMembers.length; // Generate a unique key for the member
        update(membersRef, { [newMemberKey]: newMember })
          .then(() => console.log('Member added successfully'))
          .catch((error) => console.error('Error adding member:', error));
      } else {
        console.log('Member already exists');
      }
    } else {
      set(membersRef, { [push(membersRef).key]: newMember })
        .then(() => console.log('Member list created and member added'))
        .catch((error) => console.error('Error setting member list:', error));
    }
  });
};
const handleUpload123 = async () => {
  console.log('Fetching GD data...');
  const gddataRef = ref(database, `GroupDiscussions/${id}`);

  onValue(gddataRef, async (snapshot) => { // Make this function async
    const data = snapshot.val();
    if (data) {
      console.log('GD data:', data);

      if (!data.gdtopic) { // Check for empty gdtopic
        const newTopic = await genratedGDtopic(); // ✅ Wait for the actual topic

        if (newTopic) { // Ensure it's not undefined
          console.log('Generated Topic: ---->', newTopic);

          update(gddataRef, { gdtopic: newTopic })
            .then(() => console.log('Topic added successfully'))
            .catch((error) => console.error('Error updating topic:', error));
        } else {
          console.log('No topic generated');
        }
      } else {
        console.log('Topic already exists');
        setGDtopic(data.gdtopic);
      }
    }
  });
};
const removeMemberFromSchedule = (memberToRemove) => {
  const membersRef = ref(database, `GroupDiscussions/${id}/Member`);

  get(membersRef).then((snapshot) => {
    if (snapshot.exists()) {
      const currentMembers = snapshot.val();
      const updatedMembers = Object.fromEntries(
        Object.entries(currentMembers).filter(([key, member]) => member !== memberToRemove)
      );

      set(membersRef, updatedMembers) // Use `set()` to replace the list
        .then(() => console.log('Member removed successfully'))
        .catch((error) => console.error('Error removing member:', error));
    } else {
      console.log('No members found');
    }
  });
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

    const res = await generateContent(prompt); // Assume generateContent is an API function
    console.log("Full API response:",''); 

setGDtopic(res);
  } catch (error) {
    console.error('Error generating content:', error);
  }
};



  useEffect(() => {
    fetchSchedules();
    // genratedGDtopic();
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

   
    zp.joinRoom({
      container: meetingContainerRef.current,
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall, // Group Call for GD
      },
      sharedLinks: [
        {
          name: 'Copy Link',
          url: `${window.location.origin}/Home/Rooms/${id}`,
        },
      ],
      showParticipantList: true,
      showTextChat: true,
      showMicrophoneToggleButton: true,
      showCameraToggleButton: true,
      backgroundUrl:
        'https://static.vecteezy.com/system/resources/previews/011/875/478/original/meet-of-team-of-people-for-talk-dialog-communication-discussion-business-relationship-discuss-problems-together-exchange-opinions-of-team-worker-support-group-illustration-vector.jpg',
      showRoomTimer: true,
      layout: 'Grid',
      showLayoutButton: false,
      showOnlyAudioUser: true,
      showScreenSharingButton: false,
      showPinButton: false,
      showPreJoinView: true,
      turnOnMicrophoneWhenJoining: false,
      turnOnCameraWhenJoining: true,
      useFrontFacingCamera: true,
      videoResolutionDefault: '720p',
      maxUsers: 11,

      onLeaveRoom: () => {
        // removeMemberFromSchedule(globalUser.uid);
      }
      ,
      onJoinRoom: () => {
        addMemberToSchedule(globalUser.uid);
        
      },
    });

    // Cleanup on component unmount
    return () => {
      zp.destroy();
    };
  }, [id, AppId, ServerSecret]); // Re-run whenever API keys or id changes


  const [time, setTime] = useState(900); // Initialize timer with 15 minutes (900 seconds)
  const [dengertime, setDengertime] = useState(false);
  const navigate = useNavigate()
  // Countdown timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          navigate(`/Home/Rating/${id}`);

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
      <div className="flex justify-center items-center w-[80%] bg-blue-400 h-[100%] overflow-hidden rounded-xl p-1.5">
        <p className="md:text-xl text-white overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-300">
          {GDtopic}
        </p>
      </div>
      {/* Second div (countdown timer) */}
      <div className={"flex justify-center items-center w-[20%]  h-[100%] rounded-2xl p-1.5 ml-10 "+(dengertime?'bg-red-100':'bg-red-400')}>
        <p className={`md:text-2xl `+(dengertime?'text-red-500':'text-white')}>{formatTime(time)}</p>
      </div>
        
      </div>
      <div ref={meetingContainerRef} className="w-[80%] h-[70%] rounded-2xl " />
    </div>
  );
}

export default Meeting;
