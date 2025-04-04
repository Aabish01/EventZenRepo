package com.example.venues.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import com.example.venues.model.Event;
import com.example.venues.model.EventRegistration;
import com.example.venues.repository.EventRegistrationRepository;
import com.example.venues.service.EventService;

@RestController
@RequestMapping("/api/registration")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
public class EventRegistrationController {

    @Autowired
    private EventRegistrationRepository registrationRepo;

    @Autowired
    private EventService eventService;

    
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody Map<String, String> request, JwtAuthenticationToken token) {
        String userId = (String) token.getTokenAttributes().get("userId");
        String userName = (String) token.getTokenAttributes().get("userName");
        String eventId = request.get("eventId");

        if (registrationRepo.existsByUserIdAndEventId(userId, eventId)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Already Registered");
        }

        EventRegistration registration = new EventRegistration(userId, eventId, userName);
        registrationRepo.save(registration);

        return ResponseEntity.ok("Registered successfully");
    }

    
    @GetMapping("/my-events")
    public ResponseEntity<List<Event>> getRegisteredEvents(JwtAuthenticationToken token) {
        String userId = (String) token.getTokenAttributes().get("userId");
        List<Event> events = eventService.getEventsForUser(userId);
        return ResponseEntity.ok(events);
    }
}
