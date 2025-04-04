package com.example.venues.repository;

import com.example.venues.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
}
