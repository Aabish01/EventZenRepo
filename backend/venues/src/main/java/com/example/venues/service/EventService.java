package com.example.venues.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.venues.model.Event;
import com.example.venues.model.EventRegistration;
import com.example.venues.repository.EventRegistrationRepository;
import com.example.venues.repository.EventRepository;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;
    
    @Autowired
    private EventRegistrationRepository eventRegistrationRepository;

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public List<Event> getEventsForUser(String userId) {
        List<EventRegistration> registrations = eventRegistrationRepository.findByUserId(userId);

        List<String> eventIds = registrations.stream()
                .map(EventRegistration::getEventId)
                .collect(Collectors.toList());

        return eventRepository.findAllById(eventIds);
    }
}
