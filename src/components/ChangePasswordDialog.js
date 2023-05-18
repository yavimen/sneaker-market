import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Button,
} from "@mui/material";

const ChangePasswordDialog = ({ open, onClose, email }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordChange = () => {
    if (password !== confirmPassword) {
      alert("Passwords not equal");
      return;
    }
    if (password === "") {
      alert("Enter new password");
      return;
    }
    setIsLoading(true);

    fetch(`https://localhost:7201/api/account/change-password/${email}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    })
      .then(() => {
        alert("Password changed successfully.");
        setPassword("");
        setConfirmPassword("");
      })
      .finally(() => {
        setIsLoading(false);
        onClose();
      });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Change Password</DialogTitle>
      <DialogContent>
        <TextField
          label="New Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          autoFocus
        />
        <TextField
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={handlePasswordChange}>Confirm</Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ChangePasswordDialog;
