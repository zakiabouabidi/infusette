package com.example.infusette.web.dto;

import com.example.infusette.dao.entites.Categorie;
import lombok.Builder;

@Builder
public record CategorieSummaryDTO(
    Long id,
    String name_Categorie,
    String description,
    String image
    ) {

  public static CategorieSummaryDTO toCategorieSummaryDTO(Categorie categorie){
   CategorieSummaryDTO categorieSummaryDTO=CategorieSummaryDTO.builder()
                .id(categorie.getId())
                .name_Categorie(categorie.getName_Categorie())
                .description(categorie.getDescription())
                .image(categorie.getImage())
                .build();
                return categorieSummaryDTO;
  }

  public static Categorie fromCategorieSummaryDTO(CategorieSummaryDTO categorieSummaryDTO) {
   Categorie categorie=Categorie.builder()
         .id(categorieSummaryDTO.id())
         .name_Categorie(categorieSummaryDTO.name_Categorie())
         .description(categorieSummaryDTO.description())
         .image(categorieSummaryDTO.image())
         .build();

         return categorie;
  }
}



