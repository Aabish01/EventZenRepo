import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./components/WelcomePage";

import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterPage from "./components/RegisterPage";
import UserDashBoard from "./pages/UserDashBoard";
import AdminDashBoard from "./pages/AdminDashBoard";
import AdminLogin from "./pages/AdminLogin";
import VenueManagement from "./pages/VenueManagement";
import AttandeeManagement from "./pages/AttandeeManagement";
import VendorManagement from "./pages/VendorManagement";
import ManageProfile from "./pages/ManageProfile";
import AdminViewRegisterations from "./pages/AdminViewRegisterations";
import Logout from "./pages/Logout";
import MyRegisteredEvents from "./components/MyRegisteredEvents";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/dashboard" element={<h2>Success! Welcome to EventZen Dashboard</h2>} />
        <Route path="/userdashboard" element={<UserDashBoard/>}/>
        <Route path="/admindashboard" element={<AdminDashBoard/>}/>
        <Route path="/venueManagement" element={<VenueManagement/>}/>
       <Route path="/attandeeManagement" element={<AttandeeManagement/>}/>
       <Route path="/vendorManagement" element={<VendorManagement/>}/>
       <Route path="/manage-profile" element={<ManageProfile/>}/>
       <Route path="/viewRegisterations" element={<AdminViewRegisterations/>}/>
       <Route path="/logout" element={<Logout/>}/>
       <Route path="/myregisteredEvents" element={<MyRegisteredEvents/>}/>
      </Routes>
    </Router>
  );
}

export default App;
