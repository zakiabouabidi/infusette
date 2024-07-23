package com.example.infusette.web.dto;

import com.example.infusette.dao.entites.Coffret;
import com.example.infusette.dao.entites.Produit;

import lombok.Builder;

import java.util.List;
import java.util.stream.Collectors;

@Builder
public record CoffretDTO(
    Long id,
    String nom,
    double prix,
    int quantite,
    List<Long> produitIds // Utiliser uniquement les IDs des produits
) {

    public static CoffretDTO toCoffretDTO(Coffret coffret) {
        return CoffretDTO.builder()
            .id(coffret.getId())
            .nom(coffret.getNom())
            .prix(coffret.getPrix())
            .quantite(coffret.getQuantite())
            .produitIds(coffret.getProduits().stream()
                .map(Produit::getId)
                .collect(Collectors.toList()))
            .build();
    }

    public static Coffret fromCoffretDTO(CoffretDTO coffretDTO, List<Produit> produits) {
        return Coffret.builder()
            .id(coffretDTO.id())
            .nom(coffretDTO.nom())
            .prix(coffretDTO.prix())
            .quantite(coffretDTO.quantite())
            .produits(produits) // Ajouter la liste des produits
            .build();
    }
}
