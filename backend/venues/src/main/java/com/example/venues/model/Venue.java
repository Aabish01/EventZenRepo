package com.example.venues.model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "venues")
public class Venue {

    @Id
    private ObjectId id;  

    private String name;
    private String location;
    private int capacity;

    public Venue() {}

    public Venue(ObjectId id, String name, String location, int capacity) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.capacity = capacity;
    }

   
    public String getId() {  
        return id.toHexString();  
    }

    public void setId(String id) {  
        this.id = new ObjectId(id); 
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public int getCapacity() { return capacity; }
    public void setCapacity(int capacity) { this.capacity = capacity; }
}
