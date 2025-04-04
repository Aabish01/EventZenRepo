import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; 

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      if (response.data.token) {
        const token = response.data.token;
        localStorage.setItem("token", token); 
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`; 

        
        const decodedToken = jwtDecode(token);
        const userRole = decodedToken.role;

        
        if (userRole === "admin") {
          navigate("/admindashboard");
        } else if (userRole === "user") {
          navigate("/userdashboard");
        } else {
          alert("Unauthorized role!");
        }
      }
    } catch (error) {
      console.error("Login failed", error);
      alert("Invalid credentials");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card" style={{ width: "25rem" }}>
        <div className="card-body">
          <h2 className="text-center mb-4">Login to EventZen</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
