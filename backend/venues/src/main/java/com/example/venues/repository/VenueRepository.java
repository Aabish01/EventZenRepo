package com.example.venues.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.venues.model.Venue;

public interface VenueRepository extends MongoRepository<Venue, String> {
    Optional<Venue> findByName(String name);
}
