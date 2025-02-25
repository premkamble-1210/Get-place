import React, { useEffect, useState } from "react";
import { getDatabase, ref, get } from "firebase/database";
import { database } from "../firebase-config"; // Ensure correct import path
import {
  Card,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  Button,
  Rating,
  Box,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

function RatingCard({ member,addRating }) {
  console.log("Member UID:", member);

  const labels = {
    0.5: "Useless",
    1: "Useless+",
    1.5: "Poor",
    2: "Poor+",
    2.5: "Ok",
    3: "Ok+",
    3.5: "Good",
    4: "Good+",
    4.5: "Excellent",
    5: "Excellent+",
  };

  const [value, setValue] = useState(5);
  const [hover, setHover] = useState(-1);
  const [user, setUser] = useState(null);

  function getLabelText(value) {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
  }

  const getUserByUID = async (uid) => {
    try {
      const userRef = ref(database, `users/${uid}`);
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        console.log("User Data:", snapshot.val());
        return snapshot.val();
      } else {
        console.log("No such user found!");
        return null;
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (member) {
        const userData = await getUserByUID(member);
        setUser(userData);
      }
    };

    fetchUser();
  }, [member]); // Ensure it runs when `member` changes

  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        padding: 2,
        maxWidth: 400,
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      {/* Profile Image */}
      <Avatar
        src={user?.photo || "https://via.placeholder.com/100"} // Use user's photo if available
        alt={user?.name || "User"}
        sx={{ width: 60, height: 60, marginRight: 2 }}
      />

      <CardContent sx={{ flex: 1 }}>
        {/* Name */}
        <Typography variant="h6" fontWeight="bold">
          {user ? user.name : "Loading..."}
        </Typography>

        {/* Rating */}
        <Rating
          name="hover-feedback"
          value={value}
          precision={0.5}
          getLabelText={getLabelText}
          onChange={(event, newValue) => setValue(newValue)}
          onChangeActive={(event, newHover) => setHover(newHover)}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
        <Box sx={{ fontSize: 14, mt: 1 }}>
          {value !== null && labels[hover !== -1 ? hover : value]}
        </Box>
      </CardContent>

      {/* Submit Button */}
      <CardActions>
        <Button variant="contained" color="primary" size="small" onClick={()=>addRating(member,value)}> 
          Submit
        </Button>
      </CardActions>
    </Card>
  );
}

export default RatingCard;
