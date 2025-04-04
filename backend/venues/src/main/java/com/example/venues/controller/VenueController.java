package com.example.venues.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.venues.model.Venue;
import com.example.venues.service.VenueService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/venues")
public class VenueController {

    @Autowired
    private VenueService venueService;

    // Get all venues
    @GetMapping
    public List<Venue> getVenues() {
        return venueService.getAllVenues();
    }

    // Add a new venue
    @PostMapping
    public Venue createVenue(@RequestBody Venue venue) {
        return venueService.addVenue(venue);
    }
}
