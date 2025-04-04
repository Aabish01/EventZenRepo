package com.example.venues.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.venues.model.Venue;
import com.example.venues.repository.VenueRepository;

@Service
public class VenueService {

    @Autowired
    private VenueRepository venueRepository;

    public List<Venue> getAllVenues() {
        return venueRepository.findAll();
    }

    public Venue addVenue(Venue venue) {
        return venueRepository.save(venue);
    }
}
