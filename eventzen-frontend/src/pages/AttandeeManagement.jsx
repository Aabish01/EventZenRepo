import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
const AttendeeManagement = () => {
  const [attendees, setAttendees] = useState([]);
  const [attendeeAdmins, setAttendeesAdmin] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    password: "",
    role: "user",
  });

  useEffect(() => {
    fetchAttendees();
    fetchAttendeesAdmins();
  }, []);

  const fetchAttendees = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/attendees");
      setAttendees(response.data);
    } catch (error) {
      console.error("Error fetching attendees:", error);
    }
  };

  const fetchAttendeesAdmins = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/attendees/admin");
      setAttendeesAdmin(response.data);
    } catch (error) {
      console.error("Error fetching admin attendees:", error);
    }
  };

  const removeAttendee = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/attendees/${id}`);
      setAttendees(attendees.filter(attendee => attendee._id !== id));
    } catch (error) {
      console.error("Error removing attendee:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const requestBody = {
        name: formData.firstName, 
        email: formData.email,
        password: formData.password,
        role: formData.role,
      };

      const response = await axios.post("http://localhost:5000/api/auth/register", requestBody);
      console.log("Registration successful:", response.data);

      
      fetchAttendees();
      fetchAttendeesAdmins();

      
      setIsModalOpen(false);
      setFormData({ firstName: "", email: "", password: "", role: "user" });
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <>
    <NavBar/>
      <div className="container mt-5">
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">User's</h2>
            <button className="btn btn-primary mb-3" onClick={() => setIsModalOpen(true)}>Add User</button>
            <table className="table table-bordered mt-3">
              <thead className="thead-dark">
                <tr>
                  <th>S.No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {attendees.map((attendee, index) => (
                  <tr key={attendee._id}>
                    <td>{index + 1}</td>
                    <td>{attendee.name}</td>
                    <td>{attendee.email}</td>
                    <td>
                      <button className="btn btn-danger" onClick={() => removeAttendee(attendee._id)}>
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {isModalOpen && (
  <div className="modal fade show d-block" role="dialog">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Register for EventZen</h5>
          <button type="button" className="close" onClick={() => setIsModalOpen(false)}>
            <span>&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleRegister}>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="form-control mb-2"
              required
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="form-control mb-2"
              required
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="form-control mb-2"
              required
              onChange={handleChange}
            />
            <select
              name="role"
              className="form-control mb-4"
              required
              onChange={handleChange}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <button type="submit" className="btn btn-primary w-100">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
)}

      <div className="container mt-5">
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">Admin's</h2>
            <table className="table table-bordered mt-3">
              <thead className="thead-dark">
                <tr>
                  <th>S.No</th>
                  <th>Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {attendeeAdmins.map((admin, index) => (
                  <tr key={admin._id}>
                    <td>{index + 1}</td>
                    <td>{admin.name}</td>
                    <td>{admin.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

   
    </>
  );
};

export default AttendeeManagement;
