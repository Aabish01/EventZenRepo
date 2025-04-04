import React, { useState, useEffect } from "react";
import { fetchEvents } from "../services/EventService";

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const loadEvents = async () => {
            const data = await fetchEvents();
            setEvents(data);
        };
        loadEvents();
    }, []);

    const registerForEvent = async (eventId) => {
        const token = localStorage.getItem("token");

        try {
            const response = await fetch("http://localhost:8081/api/registration/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ eventId })
            });

            if (response.ok) {
                setMessage("egistered successfully!");
            } else if (response.status === 409) {
                setMessage("You are already registered for this event.");
            } else {
                setMessage("Registration failed. Please try again.");
            }
        } catch (error) {
            console.error("Error during registration:", error);
            setMessage("Something went wrong.");
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Upcoming Events</h2>
            {message && (
                <div className="alert alert-info" role="alert">
                    {message}
                </div>
            )}
            {events.length > 0 ? (
                <div className="table-responsive">
                    <table className="table table-bordered table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th>Event Name</th>
                                <th>Venue</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {events.map((event) => (
                                <tr key={event.id}>
                                    <td>{event.name}</td>
                                    <td>{event.venue}</td>
                                    <td>{new Date(event.date).toLocaleString()}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={() => registerForEvent(event.id)}
                                        >
                                            Register
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No events available</p>
            )}
        </div>
    );
};

export default EventList;
