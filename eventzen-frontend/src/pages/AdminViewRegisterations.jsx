import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';

const AdminViewRegisterations = () => {
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/registrations')
      .then(response => {
        setRegistrations(response.data);
      })
      .catch(error => {
        console.error('Error fetching registrations:', error);
      });
  }, []);

  return (
    <>
    <NavBar/>
    <div className="container mt-4">
      <h2>All Event Registrations</h2>
      <table className="table table-bordered table-hover mt-3">
        <thead className="thead-dark">
          <tr>
          <th>User Name</th>
            <th>User ID</th>
            <th>Event Name</th>
            <th>Event ID</th>
          </tr>
        </thead>
        <tbody>
          {registrations.map((reg) => (
            <tr key={reg._id}>
              <td>{reg.userName}</td>
              <td>{reg.userId}</td>
              <td>{reg.eventName}</td>
              <td>{reg.eventId}</td>
             
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default AdminViewRegisterations;
