import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    password: "",
    role: "user",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(""); 

    const requestBody = {
      name: formData.firstName,
      email: formData.email,
      password: formData.password,
      role: formData.role,
    };

    try {
      const response = await authService.register(requestBody);
      console.log("Registration Response:", response);

      if (response.success) {
        setSuccess("User registered successfully!");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError(response.message || "Registration failed. Try again.");
      }
    } catch (err) {
      console.error("Registration Error:", err);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: "400px" }}>
        <h3 className="text-center mb-4">Register for EventZen</h3>
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <input
              type="text"
              name="firstName"
              className="form-control"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <select
              name="role"
              className="form-select"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {error && <p className="text-danger text-center">{error}</p>}
          {success && <p className="text-success text-center">{success}</p>}

          <button type="submit" className="btn btn-primary w-100">
            Register
          </button>
        </form>

        <p className="mt-3 text-center">
          Already have an account?{" "}
          <button
            className="btn btn-link p-0"
            onClick={() => navigate("/adminlogin")}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
