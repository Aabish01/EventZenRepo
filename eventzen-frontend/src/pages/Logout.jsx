// src/pages/Logout.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    
    localStorage.removeItem("token");

    const timer = setTimeout(() => {
      navigate("/");
    }, 2000); 

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>You have been logged out.</h2>
      <p>Redirecting to login page...</p>
    </div>
  );
};

export default Logout;
