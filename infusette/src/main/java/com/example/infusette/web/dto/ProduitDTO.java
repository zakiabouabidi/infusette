
package com.example.infusette.web.dto;

import com.example.infusette.dao.entites.Produit;

import lombok.Builder;

@Builder
public record ProduitDTO(
    Long id,
    String name,
    String ingredients,
    String description,
    String image
) {

    public static ProduitDTO toProduitDTO(Produit produit) {
        ProduitDTO produitDTO = ProduitDTO.builder()
            .id(produit.getId())
            .name(produit.getName())
            .ingredients(produit.getIngredients())
            .image(produit.getImage())
            .description(produit.getDescription())
            .build();

            return produitDTO;
    }

    public static Produit fromProduitDTO(ProduitDTO ProduitDTO) {
         Produit produit=Produit.builder()
            .id(ProduitDTO.id())
            .name(ProduitDTO.name())
            .ingredients(ProduitDTO.ingredients())
            .image(ProduitDTO.image())
            .description(ProduitDTO.description())
           
            .build();

            return produit;
    }
}
