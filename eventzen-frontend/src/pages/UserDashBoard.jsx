import EventList from "../components/EventList";
import MyRegisteredEvents from "../components/MyRegisteredEvents";
import UserNavBar from "../components/UserNavBar";
import ViewVenues from "./ViewVenues";

const userDashBoard=()=>
{
    return(<>
    <UserNavBar/>
    <EventList/> 
    <ViewVenues/>
    
    
    
    </>)
}
export default userDashBoard;