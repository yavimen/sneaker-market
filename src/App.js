import { useState } from "react";
import "./App.css";
import LoginPage from "./components/LoginPage";
import { AuthContext } from "./components/AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./components/RegisterPage";
import ShoesPage from "./components/CollectionPage";
import NavigationalBar from "./components/NavigationalBar";
import BasketPage from "./components/BasketPage";
import FeedbacksPage from "./components/FeedbacksPage";
import UserProfilePage from "./components/UserAccountPage";
function App() {
  const [user, setUser] = useState(null);
  const [basket, setBasket] = useState([]);
  const [shoes, setShoes] = useState([]);
  return (
    <div>
      <AuthContext.Provider
        value={{ user, setUser, basket, setBasket, shoes, setShoes }}
      >
        <BrowserRouter>
          {user != null && <NavigationalBar />}
          <Routes>
            <Route path="register" element={<RegisterPage />} />
            <Route path="/" element={<ShoesPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="basket" element={<BasketPage />} />
            <Route path="profile" element={<UserProfilePage />} />
            <Route path="feedbacks" element={<FeedbacksPage />} />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
