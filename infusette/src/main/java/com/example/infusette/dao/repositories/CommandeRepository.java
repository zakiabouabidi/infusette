package com.example.infusette.dao.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.infusette.dao.entites.Commande;

public interface CommandeRepository  extends JpaRepository<Commande, Long> {

}
