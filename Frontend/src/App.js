import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { BounceLoader } from "react-spinners";
import "./index.css";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Payment from "./components/Payment";
import Booking from "./components/Booking";
import Profile from "./components/Profile";

const AppWithRouter = () => {
  const location = useLocation();
  const isLoginPage =
    location.pathname === "/" || location.pathname === "/register";
  const [user, setUser] = useState(null);

  return (
    <>
      {!isLoginPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Register setUser={setUser} />} />
        <Route path="/register" element={<Navigate to="/" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/booking" element={<Booking />} />
        <Route
          path="/Profile"
          element={<Profile user={user} setUser={setUser} />}
        />
      </Routes>
    </>
  );
};

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <BounceLoader color="#202c45" size={80} />
        <h1 className="loading-text">Loading...</h1>
      </div>
    );
  }

  return (
    <Router>
      <AppWithRouter />
    </Router>
  );
};

export default App;
