package com.example.venues.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "event_registrations")
public class EventRegistration {
    @Id
    private String id;
    private String userId;
    private String eventId;
    private String userName; 
    
    public EventRegistration(String userId, String eventId,String userName) {
        this.userId = userId;
        this.eventId = eventId;
        this.userName = userName;
    }

    // Getters and setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getEventId() {
        return eventId;
    }

    public void setEventId(String eventId) {
        this.eventId = eventId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

   
}

