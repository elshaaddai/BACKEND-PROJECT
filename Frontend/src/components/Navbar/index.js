import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [blur, setBlur] = useState(false);
  const location = useLocation();

  useEffect(() => {
    function blurHandler() {
      console.log("ScrollY:", window.scrollY);
      if (window.scrollY > 100) {
        setBlur(true);
      } else {
        setBlur(false);
      }
    }

    window.addEventListener("scroll", blurHandler);

    return () => {
      window.removeEventListener("scroll", blurHandler);
    };
  }, []);

  return (
    <div className={`nav-bar ${blur ? "nav-sticky" : ""}`}>
      <nav
        className={`navbar navbar-expand-lg navbar-dark ${
          blur ? "navbar-blur" : ""
        }`}
      >
        <div className="container">
          <div
            className="collapse navbar-collapse justify-content-between"
            id="navbarCollapse"
          >
            <div
              className="collapse navbar-collapse justify-content-between"
              id="navbarCollapse"
            >
              <div className="navbar-nav">
                <Link
                  to="/home"
                  className={`nav-item nav-link ${
                    location.pathname === "/home" ? "active" : ""
                  }`}
                >
                  Home
                </Link>
                <Link
                  to="/booking"
                  className={`nav-item nav-link ${
                    location.pathname === "/booking" ? "active" : ""
                  }`}
                >
                  Booking
                </Link>
                <Link
                  to="/payment"
                  className={`nav-item nav-link ${
                    location.pathname === "/payment" ? "active" : ""
                  }`}
                >
                  Payment
                </Link>
                <Link
                  to="/profile"
                  className={`nav-item nav-link ${
                    location.pathname === "/profile" ? "active" : ""
                  }`}
                >
                  Profile
                </Link>
              </div>
            </div>

            <div
              className="row"
              style={{
                color: "red",
                fontWeight: "bold",
                fontStyle: "italic",
                fontSize: "35px",
                margin: "0px",
              }}
            >
              Car
            </div>
            <div
              style={{
                color: "white",
                fontWeight: "bold",
                fontStyle: "italic",
                fontSize: "38px",
              }}
            >
              Wash
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
