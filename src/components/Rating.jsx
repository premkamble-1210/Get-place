import React, { useEffect, useState,useContext } from "react";
import { Box, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { database } from "../firebase-config";
import { ref, get, update } from "firebase/database";
import RatingCard from "./Ratingcard";
import { Globlelogin } from "../App";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function Rating123() {
  const [members, setMembers] = useState([]);
  const { id } = useParams();
  const { globalUser } = useContext(Globlelogin);
  const navigate = useNavigate(); // Initialize navigation

  // Fetch Members from Firebase
  const handleUsers = async () => {
    const membersRef = ref(database, `GroupDiscussions/${id}/Member`);
    try {
      const snapshot = await get(membersRef);
      if (snapshot.exists()) {
        const allMembers = Object.values(snapshot.val());
        const filteredMembers = allMembers.filter(member => member !== globalUser.uid);
        setMembers(filteredMembers);
      }
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  useEffect(() => {
    handleUsers();
  }, []);

  // Function to Add Rating to Firebase
  const addRating = async (uid, ratingValue) => {
    try {
      const userRef = ref(database, `users/${uid}/ratings`);
      const snapshot = await get(userRef);
      const existingRatings = snapshot.exists() ? snapshot.val() : [];
      const updatedRatings = [...existingRatings, ratingValue];

      await update(ref(database, `users/${uid}`), { ratings: updatedRatings });
      console.log("Rating added successfully!");

      // Remove the user from the state
      setMembers((prevMembers) => {
        const updatedMembers = prevMembers.filter((member) => member !== uid);
        
        // Check if no members are left, then navigate
        if (updatedMembers.length === 0) {
          navigate("/Home/GDrooms"); // Change to your desired route
        }

        return updatedMembers;
      });

    } catch (error) {
      console.error("Error updating ratings:", error);
    }
  };

  return (
    <div className="h-full w-full">
      <div className="w-full h-43 flex justify-center items-center">
        <div className="w-[80%] h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-2xl md:text-4xl font-bold text-gradient bg-gradient-to-r from-[#E4C9F5] to-[#C55FF4] bg-clip-text text-transparent">
            Group Discussions Feedback
          </h1>
          <p className="mt-2 text-sm md:text-lg text-gray-600 hidden md:block">
            Share your thoughts and rate fellow participants based on their contributions.
            Your feedback helps create a more engaging and insightful discussion experience!
          </p>
        </div>
      </div>

      <Box
        sx={{
          width: "100%",
          height: "100vh",
          overflowY: "auto",
          padding: 2,
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
          }}
        >
          {members.map((member, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              key={index}
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <RatingCard member={member} addRating={addRating} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}

export default Rating123;
