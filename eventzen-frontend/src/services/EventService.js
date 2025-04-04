import axios from "axios";

const API_URL = "http://localhost:8081/api/events"; 

export const fetchEvents = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching events:", error);
        return [];
    }
};

export const getMyRegisteredEvents = async () => {
    const token = localStorage.getItem("token"); 
  
    const response = await axios.get("http://localhost:8081/api/registration/my-events", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  
    return response.data;
  };