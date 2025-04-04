import Navbar from "../components/NavBar"
import EventTable from "../components/EventTable";
import ScheduledEvents from "../components/ScheduledEvents";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; 


const AdminDashBoard=()=>
    {
        const navigate = useNavigate();
       
        return<>
        <Navbar/>
        <h1 className="text-center">Admin Dashboard</h1>
        <div className="d-flex justify-content-center gap-2 mb-3">
        <Button onClick={()=>navigate("/venueManagement")}>Go to venue Management</Button>
        <Button onClick={()=>navigate("/attandeeManagement")}>AtandeeManagemnt</Button>
        <Button onClick={()=>navigate("/vendorManagement")}>VendorManagement</Button>
        <Button onClick={()=>navigate("/viewRegisterations")}>viewRegisterations</Button>
        </div>
        <EventTable/>
        <ScheduledEvents/>
        
    
        </>
        
       

    }
 export default AdminDashBoard;