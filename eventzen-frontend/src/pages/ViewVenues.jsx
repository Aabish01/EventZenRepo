import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const ViewVenues = () => {
    const [venues, setVenues] = useState([
        {
            name: "Grand Hall",
            location: "Downtown",
            capacity: 200,
        },
        {
            name: "Sunset Garden",
            location: "Riverside",
            capacity: 150,
        },
        {
            name: "Skyline Roof",
            location: "City Center",
            capacity: 100,
        },
    ]);

    const token = localStorage.getItem("token"); 
    console.log(token);

    useEffect(() => {
        axios.get("http://localhost:8081/api/venues", {
            headers: { Authorization: `Bearer ${token}` }, 
        })
        .then(response => setVenues(response.data))
        .catch(error => console.error("Error fetching venues:", error));
    }, []);

    return (
        <div className="container d-flex justify-content-center vh-50">
            <div className="w-75">
                <h2 className="text-center mb-4">Available Venues</h2>
                <table className="table table-striped table-bordered text-center">
                    <thead className="thead-dark">
                        <tr>
                            <th>S.No</th>
                            <th>Name</th>
                            <th>Location</th>
                            <th>Capacity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {venues.map((venue, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{venue.name}</td>
                                <td>{venue.location}</td>
                                <td>{venue.capacity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewVenues;
