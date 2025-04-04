package com.example.venues.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import com.example.venues.model.Booking;
import com.example.venues.model.Venue;
import com.example.venues.repository.BookingRepository;
import com.example.venues.repository.VenueRepository;

@CrossOrigin(origins = "http://localhost:3000") // frontend access
@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private VenueRepository venueRepository;

    @PostMapping
    public ResponseEntity<String> bookVenue(@RequestBody Booking bookingRequest, 
                                            @AuthenticationPrincipal UserDetails userDetails) {
        
        String userId = userDetails.getUsername(); 

        if (bookingRequest.getVenueName() == null) {
            return ResponseEntity.badRequest().body("Error: Venue Name is missing!");
        }


        Optional<Venue> venue = venueRepository.findByName(bookingRequest.getVenueName());
        if (venue.isEmpty()) {
            return ResponseEntity.badRequest().body("Error: Venue does not exist!");
        }
        Booking booking = new Booking();
        booking.setUserId(userId);
        booking.setVenueName(bookingRequest.getVenueName());
        booking.setBookingDate(LocalDate.now().toString());
        bookingRepository.save(booking);

        venueRepository.delete(venue.get());

        return ResponseEntity.ok("Booking confirmed for venue: " + bookingRequest.getVenueName());
    }

    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }
}
