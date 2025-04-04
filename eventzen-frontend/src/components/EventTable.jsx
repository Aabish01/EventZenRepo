import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Form, Modal } from "react-bootstrap";

const EventTable = () => {
    const [events, setEvents] = useState([]);
    const [show, setShow] = useState(false);
    const [newEvent, setNewEvent] = useState({
        name: "",
        date: "",
        venue: "",
        status: "Scheduled",
    });

    
    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const res = await axios.get("http://localhost:5000/events");
            
            console.log("Events received:", res.data);
            setEvents(res.data);
        } catch (error) {
            console.error(" Error fetching events:", error.message);
        }
    };
    const handleAddEvent = async () => {
        if (!newEvent.name || !newEvent.date || !newEvent.venue || !newEvent.status) {
            console.error("All fields are required!");
            return;
        }
    
        const formattedDate = new Date(newEvent.date).toISOString(); 
    
        const eventToSend = {
            ...newEvent,
            date: formattedDate 
        };
    
        try {
            const response = await axios.post("http://localhost:5000/events", eventToSend, {
                headers: { "Content-Type": "application/json" },
            });
    
            console.log("✅ Event added:", response.data);
            setEvents([...events, response.data]); 
            setShow(false);
            setNewEvent({ name: "", date: "", venue: "", status: "Scheduled" });
        } catch (error) {
            console.error("Error adding event:", error.response?.data || error.message);
        }
    };
    
    const handleRemoveEvent = async (_id) => {
        if (!_id) {
            console.error(" Error: Event ID is undefined!");
            return;
        }
        console.log("🗑️ Removing event with ID:",_id);
    
        try {
            await axios.delete(`http://localhost:5000/events/${_id}`);
            setEvents(events.filter(event => event._id !==_id));
        } catch (error) {
            console.error(" Error removing event:", error.response?.data || error.message);
        }
    };
    

    return (
        <div className="container mt-4">
            <h2>Event's <Button variant="primary" onClick={() => setShow(true)}>+ Add Event</Button></h2>

            
            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Venue</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map((event, index) => (
                        <tr key={event.id ||index}>
                            <td>{index+1}</td>
                            <td>{event.name}</td>
                            <td>{new Date(event.date).toString()}</td>

                            <td>{event.venue}</td>
                            <td>{event.status}</td>
                            <td>
                                <Button variant="danger" onClick={() => handleRemoveEvent(event._id)}>Remove</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Event</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Event Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={newEvent.name}
                                onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={newEvent.date}
                                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Venue</Form.Label>
                            <Form.Control
                                type="text"
                                value={newEvent.venue}
                                onChange={(e) => setNewEvent({ ...newEvent, venue: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Status</Form.Label>
                            <Form.Control
                                as="select"
                                value={newEvent.status}
                                onChange={(e) => setNewEvent({ ...newEvent, status: e.target.value })}
                            >
                                <option>Scheduled</option>  
                                <option>Completed</option>  
                                <option>Cancelled</option>  
                            </Form.Control>
                        </Form.Group>
                        
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
                    <Button variant="primary" onClick={handleAddEvent}>Add Event</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default EventTable;
