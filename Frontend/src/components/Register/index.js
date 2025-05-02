import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../API/api";

const Register = ({ setUser }) => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();

    try {
      const response = await API.post("/", {
        name,
        email,
        password,
      });

      const newUser = response.data.data || response.data;
      setUser(newUser);
      navigate("/home");
    } catch (error) {
      console.error("Register failed", error);
      setError(
        error.response?.data?.message || "Register failed. Please try again"
      );
    }
  };

  return (
    <div className="page-login">
      <div className="container-login">
        <div>
          <h2 className="Login">Register to Car Wash</h2>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <form onSubmit={handleRegister}>
            <div className="group-form">
              <input
                type="name"
                className="control-form"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="group-form">
              <input
                type="email"
                className="control-form"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="group-form">
              <input
                type="password"
                className="control-form"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn-login btn-login-custom">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
