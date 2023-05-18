import React, { useContext, useEffect } from "react";
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Typography,
  TableHead,
  Button,
} from "@mui/material";
import { AuthContext } from "./AuthContext";
import styles from "./BasketPage.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const BasketPage = () => {
  const { basket, setBasket, shoes, user } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);
  const total = Object.keys(basket).reduce((acc, shoeId) => {
    const shoe = shoes.find((item) => item.id === shoeId);
    const quantity = basket[shoeId];
    const price = shoe?.shoesAdditionalInfos[0]?.pricePerOne || 0;
    return acc + price * quantity;
  }, 0);
  const handleClearBasket = () => {
    console.log(basket);
    setBasket({});
  };
  const handleConfirmOrder = async () => {
    try {
      const orderDto = Object.keys(basket).map((shoeId) => ({
        AdditionalInfoId: shoeId,
        Number: basket[shoeId],
      }));
      console.log(orderDto);
      await axios.post(
        "https://localhost:7201/api/shoes/buy/" + user.email,
        orderDto
      );

      setBasket({});
    } catch (error) {
      console.error("Error confirming order:", error);
    }
  };
  return (
    <div className={styles.basketContainer}>
      <TableContainer component={Paper} className={styles.tableContainer}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Shoes</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Info</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(basket).map((shoeId) => {
              const shoe = shoes.find((item) => item.id === shoeId);
              const quantity = basket[shoeId];
              return (
                <TableRow key={shoe.id}>
                  <TableCell>{shoe.shoesName}</TableCell>
                  <TableCell>{quantity}</TableCell>
                  <TableCell>{shoe.category.category1}</TableCell>
                  {shoe.shoesAdditionalInfos.map((info) => (
                    <TableCell key={info.id}>
                      Size: {info.shoesSize}, Price: {info.pricePerOne},
                      Quantity: {info.quantity}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="h6" component="div" className={styles.totalPrice}>
        Total Price: {total}
      </Typography>
      <div className={styles.basketContainer}>
        <Button
          className={styles.clearButton}
          variant="contained"
          onClick={() => {
            handleConfirmOrder();
          }}
        >
          Confirm Order
        </Button>
      </div>
      <div className={styles.basketContainer}>
        <Button
          className={styles.clearButton}
          variant="contained"
          onClick={() => {
            handleClearBasket();
          }}
        >
          Clear Basket
        </Button>
      </div>
    </div>
  );
};

export default BasketPage;
