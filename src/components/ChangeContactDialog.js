import React, { useState, useContext } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Button,
} from "@mui/material";
import { AuthContext } from "./AuthContext";
import axios from "axios";
const ChangeContactDialog = ({
  open,
  onClose,
  email,
  name: initialName,
  surname: initialSurname,
  phoneNumber: initialPhoneNumber,
  city: initialCity,
}) => {
  const [name, setName] = useState(initialName);
  const [surname, setSurname] = useState(initialSurname);
  const [phoneNumber, setPhoneNumber] = useState(initialPhoneNumber);
  const [city, setCity] = useState(initialCity);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useContext(AuthContext);

  const handleContactChange = () => {
    setIsLoading(true);

    fetch(`https://localhost:7201/api/account/change-contact/${email}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        surname,
        phoneNumber,
        city,
      }),
    })
      .then((response) => {
        try {
          axios
            .get("https://localhost:7201/api/account/details/" + email)
            .then((response) => {
              console.log(response.data);
              setUser({ ...response.data });
            })
            .catch((error) => {
              console.log(error);
            });
        } catch (error) {
          console.error("Error occurred:", error);
        }
      })
      .finally(() => {
        setIsLoading(false);
        onClose();
      });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Change Contact Information</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Surname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleContactChange} disabled={isLoading}>
          {isLoading ? <CircularProgress size={20} /> : "Confirm"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangeContactDialog;
