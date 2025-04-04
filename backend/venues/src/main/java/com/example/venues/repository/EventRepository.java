package com.example.venues.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.venues.model.Event;

 public interface EventRepository extends MongoRepository<Event, String> {


}
