import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; 
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function NavBar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log("Decoded Token:", decodedToken); 
        setUser(decodedToken); 
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);

 

  const goToProfile = () => {
    navigate("/manage-profile"); 
  };

  return (
    <Navbar data-bs-theme="light" style={{ backgroundColor: "rgba(128, 0, 128, 0.3)", color: "#333" }}>
      <Container>
        <Navbar.Brand href="/">EventZen</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/admindashboard">Home</Nav.Link>
        </Nav>
        <Nav className="ms-auto">
          {user ? (
            <>
              <span 
                onClick={goToProfile} 
                style={{ marginRight: "15px", fontWeight: "bold", color: "blue", cursor: "pointer", textDecoration: "underline" }}
              >
                Welcome, {user.name}
              </span>
              <Nav.Link href="/logout" style={{ cursor: "pointer", color: "red" }}>
                Logout
             </Nav.Link>

            </>
          ) : (
            <Nav.Link href="/login">Login</Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;
