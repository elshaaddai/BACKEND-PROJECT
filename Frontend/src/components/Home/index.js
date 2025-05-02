import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../Footer";
import { CSSTransition } from "react-transition-group";
import carWashImg from "../../assets/img/carWash.jpg";
import API from "../../API/api";

const Home = () => {
  const [contentVisible, setContentVisible] = useState(false);
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setTimeout(() => setContentVisible(true), 500);
    const fetchUser = async () => {
      try {
        const response = await API.post("/", { name, email, password });
        setUser(response.data.data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
    fetchUser();
  }, [name, email, password]);

  const pricePlans = [
    {
      title: "Basic Cleaning",
      price: "45.000",
      details: "Includes seat washing, vacuuming, and exterior cleaning.",
    },
    {
      title: "Premium Cleaning",
      price: "60.000",
      details:
        "Includes seat washing, vacuuming, exterior and interior wet cleaning.",
    },
    {
      title: "Complex Cleaning",
      price: "70.000",
      details:
        "Covers all standard services: vacuuming, wet cleaning, and free tire polish.",
    },
    {
      title: "Executive Cleaning",
      price: "85.000",
      details:
        "Adds dashboard detailing and engine bay cleaning to complex cleaning.",
    },
    {
      title: "Luxury Detailing",
      price: "110.000",
      details:
        "Full interior shampoo, engine steam cleaning, wax polish, and tire polish.",
    },
    {
      title: "Ultimate Detailing",
      price: "150.000",
      details:
        "Complete restoration package: ceramic coating, headlight polishing, interior protection, and more.",
    },
  ];

  return (
    <div>
      {/* About Section */}
      <div className="about">
        <div className="page-header">
          <div className="container">
            <CSSTransition
              in={contentVisible}
              timeout={500}
              classNames="fade"
              unmountOnExit
              appear
            >
              <div className="row">
                <div className="col-12">
                  <h2>Welcome User to CarWash</h2>
                </div>
                <div className="col-12">
                  <Link to="/home">Home</Link>
                </div>
              </div>
            </CSSTransition>
          </div>
        </div>

        <CSSTransition
          in={contentVisible}
          timeout={500}
          classNames="fade"
          unmountOnExit
          appear
        >
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="about-img">
                  <img src={carWashImg} alt="CarWash" className="img-fluid" />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="section-header text-left">
                  <p>About CarWash</p>
                  <h2>Car Washing and Detailing</h2>
                </div>
                <div className="about-content">
                  <p>
                    Our service is not just a wash as it is a real treatment for
                    your car. The car gets a rebirth due to our CCS which is
                    truly regenerative therapy. Research has shown, steam
                    pressure cleaning prevents corrosion for a period of 2 years
                    when compared to the regular use of water for cleaning.
                  </p>
                  <ul>
                    <li>
                      <i className="far fa-check-circle" /> Seats Washing
                    </li>
                    <li>
                      <i className="far fa-check-circle" /> Vacuum Cleaning
                    </li>
                    <li>
                      <i className="far fa-check-circle" /> Interior Wet
                      Cleaning
                    </li>
                    <li>
                      <i className="far fa-check-circle" /> Window Wiping
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CSSTransition>
      </div>

      {/* Price Section */}
      <div className="price">
        <div className="container">
          <div className="section-header text-center">
            <p>Washing Plan</p>
            <h2>Choose Your Plan</h2>
          </div>

          <div className="price-scroll-wrapper">
            <div className="row flex-nowrap overflow-auto" id="price-scroll">
              {pricePlans.map((plan, index) => (
                <div className="col-md-4 price-card" key={index}>
                  <div className="price-item">
                    <div className="price-header text-center">
                      <h3>{plan.title}</h3>
                      <h2>
                        <span>Rp</span>
                        <strong>{plan.price.split(".")[0]}</strong>
                        <span>.{plan.price.split(".")[1]}</span>
                      </h2>
                    </div>
                    <div className="arrow text-center my-3">
                      <i className="fas fa-arrow-down fa-2x"></i>
                    </div>
                    <div className="price-body">
                      <h4>Details</h4>
                      <p>{plan.details}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div
              className="scroll-hint"
              onClick={() => {
                document
                  .getElementById("price-scroll")
                  .scrollBy({ left: 300, behavior: "smooth" });
              }}
            >
              <i className="fas fa-arrow-right"></i>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
