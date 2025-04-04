package com.example.venues.controller;

import com.example.venues.model.User;
import com.example.venues.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/users")

public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Get user by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getUser(@PathVariable String id) {
        Optional<User> user = userRepository.findById(id);
        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Update profile
@PutMapping("/{id}")
public ResponseEntity<?> updateUser(@PathVariable String id, @RequestBody User updatedUser) {
    Optional<User> existingUserOpt = userRepository.findById(id);
    if (existingUserOpt.isEmpty()) {
        return ResponseEntity.notFound().build();
    }

    User existingUser = existingUserOpt.get();
    existingUser.setName(updatedUser.getName());
    existingUser.setEmail(updatedUser.getEmail());

    if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
        existingUser.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
    }


    userRepository.save(existingUser);
    return ResponseEntity.ok("User updated successfully!");
}

}
