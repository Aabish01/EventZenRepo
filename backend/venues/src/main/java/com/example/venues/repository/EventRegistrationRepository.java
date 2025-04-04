package com.example.venues.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.venues.model.EventRegistration;

public interface EventRegistrationRepository extends MongoRepository<EventRegistration, String> {
    boolean existsByUserIdAndEventId(String userId, String eventId);
    List<EventRegistration> findByEventId(String eventId);
    List<EventRegistration> findByUserId(String userId);

}