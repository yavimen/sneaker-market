import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import "./CollectionPage.css";

const CollectionPage = () => {
  const [collection, setCollection] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("https://localhost:7201/api/shoes");
      const data = await response.json();
      setCollection(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <h2 className="collection-title">Shoes</h2>
      <div className="collection-container">
        {collection.map((item) => (
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
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default CollectionPage;
