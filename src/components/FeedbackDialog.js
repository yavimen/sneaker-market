import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Slider,
  Button,
} from "@mui/material";
import axios from "axios";

const FeedbackDialog = ({ open, onClose, email, selectedOrderId }) => {
  const [feedback, setFeedback] = useState("");
  const [customerRated, setCustomerRated] = useState(5);

  const handleSliderChange = (event, value) => {
    setCustomerRated(value);
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `https://localhost:7201/api/feedback/${email}`,
        {
          email: email,
          feedback: feedback,
          customerRated: customerRated,
          customerOrderId: selectedOrderId,
        }
      );
      console.log("Feedback sent successfully:", response.data);
      onClose();
    } catch (error) {
      console.log("Error sending feedback:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Feedback</DialogTitle>
      <DialogContent style={{ width: "500px" }}>
        <Typography gutterBottom>Rate the customer:</Typography>
        <Slider
          value={customerRated}
          onChange={handleSliderChange}
          marks
          min={1}
          max={10}
          step={1}
        />
        <TextField
          multiline
          rows={4}
          fullWidth
          label="Feedback"
          value={feedback}
          onChange={handleFeedbackChange}
          variant="outlined"
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">
          Send Feedback
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FeedbackDialog;
