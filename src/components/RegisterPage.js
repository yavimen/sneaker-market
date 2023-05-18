import React, { useState } from "react";
import axios from "axios";
import "./RegisterPage.css";
import { useNavigate } from "react-router-dom";
const RegisterPage = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    name: "",
    surname: "",
    phoneNumber: "",
    city: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(userData);
      const response = await axios.post(
        "https://localhost:7201/api/account/register",
        userData
      );
      alert("Register successfully !");
      setUserData({
        email: "",
        password: "",
        name: "",
        surname: "",
        phoneNumber: "",
        city: "",
      });
      console.log(response.data);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="register-container">
      <h1>Registration</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Surname:</label>
          <input
            type="text"
            name="surname"
            value={userData.surname}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={userData.phoneNumber}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>City:</label>
          <input
            type="text"
            name="city"
            value={userData.city}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit">Register</button>
        <button
          onClick={() => {
            navigate("/login");
          }}
        >
          Login Page
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
