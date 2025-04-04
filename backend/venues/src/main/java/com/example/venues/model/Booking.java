package com.example.venues.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "bookings")
public class Booking {
    
    @Id
    private String id;
    private String userId;
    private String venueName;
    private String bookingDate;


    public Booking() {}

    public Booking(String userId, String venueName, String bookingDate) {
        this.userId = userId;
        this.venueName = venueName;
        this.bookingDate = bookingDate;
    }
    public String getId() { return id; }
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    public String getVenueName() { return venueName; }
    public void setVenueName(String venueName) { this.venueName = venueName; }
    public String getBookingDate() { return bookingDate; }
    public void setBookingDate(String bookingDate) { this.bookingDate = bookingDate; }
}
