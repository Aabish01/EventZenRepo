package com.example.venues.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.venues.model.Booking;

public interface BookingRepository extends MongoRepository<Booking, ObjectId> {
}
