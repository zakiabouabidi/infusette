package com.example.infusette.dao.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.infusette.dao.entites.Categorie;
import com.example.infusette.dao.entites.Produit;


@Repository
public interface ProduitRepository extends JpaRepository<Produit, Long> {
    List<Produit> findByName(String name);
    List<Produit> findByCategorieId(Long idcat);
    List<Produit> findAllByIdIn(List<Long> ids);
}
