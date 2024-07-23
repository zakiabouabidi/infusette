package com.example.infusette.business.services;

import com.example.infusette.dao.entites.Coffret;

import java.util.List;

public interface CoffretService {
    // Read operations
    List<Coffret> getAllCoffrets();
    Coffret getCoffretById(Long id) throws Exception;

    // Create
    Coffret addCoffret(Coffret coffret);

    // Update
    Coffret updateCoffret(Long id, Coffret coffret) throws Exception;

    // Delete
    void deleteCoffretById(Long id);
}
