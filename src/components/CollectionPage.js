import React, { useEffect, useState, useContext } from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import "./CollectionPage.css";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
const CollectionPage = () => {
  const { user } = useContext(AuthContext);
  const { shoes, setShoes } = useContext(AuthContext);
  const { basket, setBasket } = useContext(AuthContext);
  const [shoeQuantities, setShoeQuantities] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
    if (!user) {
      navigate("/login");
    }
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("https://localhost:7201/api/shoes");
      const data = await response.json();
      setShoes(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const increaseHandle = (item) => {
    console.log(item);
    setShoeQuantities((shoeQuantities) => ({
      ...shoeQuantities,
      [item.id]: (shoeQuantities[item.id] || 0) + 1,
    }));
  };
  const decreaseHandle = (item) => {
    console.log(item);
    setShoeQuantities((shoeQuantities) => ({
      ...shoeQuantities,
      [item.id]: Math.max((shoeQuantities[item.id] || 0) - 1, 0),
    }));
  };

  const addToBasket = (item) => {
    const quantity = shoeQuantities[item.id] || 0;
    if (quantity > 0) {
      setBasket((prevBasket) => ({
        ...prevBasket,
        [item.id]: quantity,
      }));
      setShoeQuantities((shoeQuantities) => ({
        ...shoeQuantities,
        [item.id]: 0,
      }));
    }
  };

  return (
    <>
      <h2 className="collection-title">Shoes</h2>
      <div className="collection-container">
        {shoes.map((item) => (
          <Card key={item.id} className="shoes-card">
            <CardContent>
              <Typography variant="h6" component="div" className="shoes-name">
                {item.shoesName}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                className="category"
              >
                Category: {item.category.category1}
              </Typography>
              {item.shoesAdditionalInfos.map((info) => (
                <div key={info.id} className="additional-info">
                  <Typography variant="body2" color="text.secondary">
                    Size: {info.shoesSize}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Price: {info.pricePerOne}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Quantity: {info.quantity}
                  </Typography>
                </div>
              ))}
              <div className="quantity-container">
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => decreaseHandle(item)}
                >
                  -
                </Button>
                <Typography
                  variant="body1"
                  component="span"
                  className="quantity"
                >
                  {shoeQuantities[item.id] | 0}
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => increaseHandle(item)}
                >
                  +
                </Button>
              </div>
              <Button
                style={{ marginTop: "15px" }}
                variant="contained"
                color="primary"
                onClick={() => addToBasket(item)}
                disabled={
                  !shoeQuantities[item.id] || shoeQuantities[item.id] === 0
                }
                className="add-to-basket-button"
              >
                Add to Basket
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default CollectionPage;
