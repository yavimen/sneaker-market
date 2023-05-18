import React, { useContext, useState, useEffect } from "react";
import {
  Typography,
  Box,
  Divider,
  Grid,
  Paper,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { AuthContext } from "./AuthContext";
import ChangePasswordDialog from "./ChangePasswordDialog";
import ChangeContactDialog from "./ChangeContactDialog";
import axios from "axios";

import FeedbackDialog from "./FeedbackDialog";
const UserProfilePage = () => {
  const { user } = useContext(AuthContext);
  const [openDialog, setOpenDialog] = useState(false);
  const [openContactDialog, setOpenContactDialog] = useState(false);
  const [orders, setOrders] = useState([]);
  const [openFeedbackDialog, setOpenFeedbackDialog] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        console.log("Profile user: ", user.email);
        const response = await axios.get(
          "https://localhost:7201/api/orders/customer/" + user.email
        );
        setOrders(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrders();
  }, []);
  function calculateTotal(order) {
    var sum = 0;
    order.shoesInfos.forEach((element) => {
      sum += element.pricePerOne;
    });
    return sum;
  }
  const handleAddFeedback = (orderId) => {
    setSelectedOrderId(orderId);
    setOpenFeedbackDialog(true);
  };

  const handleCloseFeedbackDialog = () => {
    setOpenFeedbackDialog(false);
  };
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenContactDialog = () => {
    setOpenContactDialog(true);
  };

  const handleCloseContactDialog = () => {
    setOpenContactDialog(false);
  };

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
          User Profile
        </Typography>

        <Divider sx={{ marginTop: 2, marginBottom: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Contacts</Typography>
            <Typography>Name: {user.name}</Typography>
            <Typography>Surname: {user.surname}</Typography>
            <Typography>Phone Number: {user.phoneNumber || "-"}</Typography>
            <Typography>City: {user.city || "-"}</Typography>
            <Typography>
              Customer Discount: {user.customerDiscount || "0%"}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  onClick={handleOpenContactDialog}
                  style={{ width: "200px" }}
                >
                  Change Contact
                </Button>
              </Grid>
            </Grid>

            <Box sx={{ marginTop: 2 }}>
              <Typography variant="h6">Orders</Typography>
              {orders.length === 0 ? (
                <Typography>No orders found.</Typography>
              ) : (
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableRow>
                          <TableCell sx={{ width: "20%" }} align="center">
                            Shoes Name
                          </TableCell>
                          <TableCell sx={{ width: "20%" }} align="center">
                            Category
                          </TableCell>
                          <TableCell sx={{ width: "20%" }} align="center">
                            Size
                          </TableCell>
                          <TableCell sx={{ width: "20%" }} align="right">
                            Price Per One
                          </TableCell>
                          <TableCell sx={{ width: "20%" }} align="right">
                            Quantity
                          </TableCell>
                        </TableRow>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {orders.map((order) => (
                        <TableRow key={order.id}>
                          <TableRow>
                            <TableCell sx={{ width: "20%" }}>
                              {dateFormat(order.dateStamp)}
                            </TableCell>
                            <TableCell sx={{ width: "20%" }}>
                              <Button
                                variant="outlined"
                                onClick={() => handleAddFeedback(order.id)}
                              >
                                Add Feedback
                              </Button>
                            </TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                          </TableRow>
                          {order.shoesInfos.map((info, index) => (
                            <TableRow key={index}>
                              <TableCell sx={{ width: "20%" }}>
                                {info.shoesName}
                              </TableCell>
                              <TableCell sx={{ width: "20%" }}>
                                {info.category}
                              </TableCell>
                              <TableCell sx={{ width: "20%" }}>
                                {info.shoesSize}
                              </TableCell>
                              <TableCell sx={{ width: "20%" }}>
                                {info.pricePerOne}
                              </TableCell>
                              <TableCell sx={{ width: "20%" }}>
                                {info.quantity}
                              </TableCell>
                            </TableRow>
                          ))}
                          <TableRow>
                            <TableRow>
                              <TableCell sx={{ width: "100%" }}>
                                {"Total price:" + calculateTotal(order)}
                              </TableCell>
                            </TableRow>
                          </TableRow>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6">Account</Typography>
            <Typography>Email: {user.email}</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  onClick={handleOpenDialog}
                  style={{ width: "200px" }}
                >
                  Change Password
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      <ChangePasswordDialog
        open={openDialog}
        onClose={handleCloseDialog}
        email={user.email}
      />
      <ChangeContactDialog
        open={openContactDialog}
        onClose={handleCloseContactDialog}
        email={user.email}
        name={user.name}
        surname={user.surname}
        phoneNumber={user.phoneNumber}
        city={user.city}
      />
      <FeedbackDialog
        open={openFeedbackDialog}
        onClose={handleCloseFeedbackDialog}
        email={user.email}
        selectedOrderId={selectedOrderId}
      />
    </Box>
  );
};

export default UserProfilePage;
