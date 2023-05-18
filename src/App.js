import { useState } from "react";
import "./App.css";
import LoginPage from "./components/LoginPage";
import { AuthContext } from "./components/AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./components/RegisterPage";
import ShoesPage from "./components/CollectionPage";
function App() {
  const [user, setUser] = useState(null);

  return (
    <div>
      <AuthContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route path="login" element={<LoginPage/>} />
              <Route path="register" element={<RegisterPage/>} />
              <Route path="shoes" element={<ShoesPage/>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
