package com.example.infusette.dao.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.infusette.dao.entites.Coffret;

@Repository
public interface CoffretRepository extends JpaRepository<Coffret, Long> {
    
}
