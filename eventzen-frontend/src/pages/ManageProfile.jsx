import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const ManageProfile = () => {
  const navigate = useNavigate();
  const [tokenData, setTokenData] = useState({ userId: "", name: "", email: "" });
  const [newData, setNewData] = useState({ name: "", email: "", password: "" });
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setTokenData({
        userId: decoded.userId,
        name: decoded.name,
        email: decoded.email,
      });
    } catch (error) {
      console.error("Invalid token:", error);
      navigate("/login");
    }
  }, []);

  const handleChange = (e) => {
    setNewData({ ...newData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatePayload = {
      _id: tokenData.userId,
      name: newData.name || tokenData.name,
      email: newData.email || tokenData.email,
      password: newData.password,
    };
    console.log("Token being sent:", token);
    console.log("Payload being sent to backend:", updatePayload);
    try {
      await axios.put(`http://localhost:8081/api/users/${tokenData.userId}`, updatePayload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Profile updated successfully!");
      
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "50px auto", textAlign: "left" }}>
      <h2>View Profile</h2>
      <div style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "8px", marginBottom: "20px" }}>
        <h4>Current Info:</h4>
        <p><strong>User ID:</strong> {tokenData.userId}</p>
        <p><strong>Name:</strong> {tokenData.name}</p>
        
        <p><strong>Email:</strong> {tokenData.email}</p>
      </div>

     
      
    </div>
  );
};

export default ManageProfile;
