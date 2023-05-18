import React, { useEffect, useState, useContext } from "react";
import {
  Typography,
  Box,
  Divider,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
const FeedbacksPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    fetch("https://localhost:7201/api/feedback")
      .then((response) => response.json())
      .then((data) => setFeedbacks(data))
      .catch((error) => console.log(error));
  }, []);

  function dateFormat(date) {
    let objectDate = new Date(date);

    let day = objectDate.getDate();
    console.log(day);

    let month = objectDate.getMonth();
    console.log(month + 1);

    let year = objectDate.getFullYear();
    console.log(year);
    return day + "/" + month + "/" + year;
  }
  return (
    <Box sx={{ padding: 2 }}>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Typography variant="h4" gutterBottom>
          Feedbacks
        </Typography>

        <Divider sx={{ marginTop: 2, marginBottom: 2 }} />

        <List>
          {feedbacks.map((feedback) => (
            <ListItem key={feedback.id}>
              <ListItemText
                primary={`${feedback.name} ${feedback.surname}`}
                secondary={dateFormat(feedback.date)}
              />
              <ListItemText primary={feedback.feedback} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default FeedbacksPage;
