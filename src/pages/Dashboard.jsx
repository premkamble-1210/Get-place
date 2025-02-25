import React, { useEffect, useState, useContext } from 'react';
import Dashnav from '../components/Dashnav';
import { LineChart } from '@mui/x-charts';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { database } from '../firebase-config';
import { ref, get } from 'firebase/database';
import { Globlelogin } from '../App';

function Dashboard() {
  const { globalUser } = useContext(Globlelogin);
  const [userdata, setUserdata] = useState([]);
  const [overallPerformance, setOverallPerformance] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userRef = ref(database, `users/${globalUser.uid}`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const ratings = snapshot.val().ratings || [];
          setUserdata(ratings);
          const avgRating = ratings.length > 0 
          ? Math.round((ratings.reduce((a, b) => a + b, 0) / ratings.length) * 20 * 100) / 100 
          : 0;
          setOverallPerformance(avgRating);
        } else {
          console.log('No data available');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    
    fetchUserData();
  }, [globalUser]);

  const yAxisLabels = {
    0:'0',
    0.5: "0.5",
    1: "1",
    1.5: "1.5",
    2: "2",
    2.5: "2.5",
    3: "3",
    3.5: "3.5",
    4: "4",
    4.5: "4.4",
    5: "5",
  };

  return (
    <div className="w-full min-h-screen flex flex-col ">
      <Dashnav />
      <div className="flex flex-col md:flex-row justify-center items-center w-full  h-full p-6 gap-6">
        {/* Line Chart Section */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <div className="bg-white shadow-lg rounded-2xl p-4 w-full max-w-md">
            <div className="w-full h-auto">
              <LineChart
                xAxis={[{ data: userdata.map((_, index) => index + 1),label: "Records", scaleType: "band"}]}
                yAxis={[{ label: "Rating",scaleType: "linear",min: 0, valueFormatter: value => yAxisLabels[value] || value }]}
                series={[{ data: userdata }]}
                width={window.innerWidth < 768 ? 300 : 450}
                height={window.innerWidth < 768 ? 200 : 300}
              />
            </div>
          </div>
        </div>

        {/* Gauge & Analysis Section */}
        <div className="w-full md:w-1/2 flex flex-col items-center gap-4">
          {/* Gauge */}
          <div className="w-full flex justify-center bg-white shadow-lg rounded-2xl p-4 max-w-md">
            <Gauge
              value={overallPerformance}
              startAngle={-110}
              endAngle={110}
              width={250}
              height={250}
              sx={{
                [`& .${gaugeClasses.valueText}`]: {
                  fontSize: 35,
                  color: 'black',
                  fontWeight: '600',
                },
              }}
              text={({ value, valueMax }) => `${value} / ${valueMax}`}
            />
          </div>
          {/* Analysis Text */}
          <div className="w-full text-center p-4 bg-gray-200 rounded-lg shadow">
            <p className="text-sm md:text-base font-medium overflow-hidden">
              Insights based on user engagement and feedback.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
