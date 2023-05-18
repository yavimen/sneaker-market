import React, { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { setUser } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Email:", email);
    console.log("Password:", password);

    console.log("Login button clicked");
    try {
      await axios
        .post("https://localhost:7201/api/account/login", {
          email: email,
          password: password,
        })
        .then((response) => {
          console.log(response.data);
          setUser({ ...response.data });
          navigate("/shoes");
        })
        .catch((error) => {
          alert("Login failed:" + error.response.data);
          console.log(error);
        });
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };
  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">Login</button>
        <button
          onClick={() => {
            navigate("/register");
          }}
        >
          Registration Page
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
