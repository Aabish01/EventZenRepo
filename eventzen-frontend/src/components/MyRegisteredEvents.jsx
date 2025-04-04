import React, { useEffect, useState } from "react";
import { getMyRegisteredEvents } from "../services/EventService";
import NavBar from "./NavBar";
import UserNavBar from "./UserNavBar";

const MyRegisteredEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      try {
        const data = await getMyRegisteredEvents();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching registered events", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegisteredEvents();
  }, []);

  return (
    <>
    <UserNavBar/>
    <div className="container mt-4">
      <h2 className="mb-4">My Registered Events</h2>

      {loading ? (
        <p>Loading...</p>
      ) : events.length === 0 ? (
        <p>You haven’t registered for any events yet.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="thead-dark">
              <tr>
                <th>Event Name</th>
                <th>Venue</th>
                <th>Date & Time</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id}>
                  <td>{event.name}</td>
                  <td>{event.venue}</td>
                  <td>{new Date(event.date).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </>
  );
};

export default MyRegisteredEvents;
