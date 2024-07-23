
package com.example.infusette.web.dto;

import java.util.List;

import com.example.infusette.dao.entites.Categorie;
import com.example.infusette.dao.entites.Produit;
import lombok.Builder;

@Builder
public record ProduitSummaryDTO(
    Long id,
    String name,
    double prix,
    int quantite,
    String ingredients,
    String description,
    String image,
    Long categorieID,
    String categorienamme
) {

    public static ProduitSummaryDTO toProduitSummaryDTO(Produit produit) {
        ProduitSummaryDTO produitSummaryDTO = ProduitSummaryDTO.builder()
            .id(produit.getId())
            .name(produit.getName())
            .prix(produit.getPrix())
            .quantite(produit.getQuantite())
            .ingredients(produit.getIngredients())
            .image(produit.getImage())
            .description(produit.getDescription())
            .categorieID(produit.getCategorie().getId())
            .categorienamme(produit.getCategorie().getName_Categorie())
            .build();

            return produitSummaryDTO;
    }

    public static Produit fromProduitSummaryDTO(ProduitSummaryDTO produitSummaryDTO) {
         Produit produit=Produit.builder()
            .id(produitSummaryDTO.id())
            .name(produitSummaryDTO.name())
            .prix(produitSummaryDTO.prix())
            .quantite(produitSummaryDTO.quantite())
            .ingredients(produitSummaryDTO.ingredients())
            .image(produitSummaryDTO.image())
            .description(produitSummaryDTO.description())
            .categorie(null)
            .build();

            return produit;
    }
}
