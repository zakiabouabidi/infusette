package com.example.infusette.web.dto;

import com.example.infusette.dao.entites.Commande;
import com.example.infusette.dao.entites.Produit;
import com.example.infusette.dao.Status;
import lombok.Builder;

import java.util.List;
import java.util.stream.Collectors;

@Builder
public record CommandeSummarryDTO(
    Long id,
    List<Long> produitIds,
    double totalAchat,
    int quantite,
    Status status
) {
    /**
     * Convertit une entité Commande en CommandeSummarryDTO.
     *
     * @param commande L'entité Commande à convertir
     * @return Le DTO CommandeSummarryDTO correspondant
     */
    public static CommandeSummarryDTO toCommandeSummarryDTO(Commande commande) {
        List<Long> produitIds = commande.getProduits().stream()
                .map(Produit::getId)
                .collect(Collectors.toList());

        return CommandeSummarryDTO.builder()
            .id(commande.getId())
            .produitIds(produitIds)
            .totalAchat(commande.getTotalAchat())
            .quantite(commande.getQuantite())
            .status(commande.getStatut())
            .build();
    }

    /**
     * Convertit un CommandeSummarryDTO en une entité Commande.
     *
     * @param commandeSummarryDTO Le DTO à convertir
     * @param produits La liste des produits associés à la commande
     * @return L'entité Commande correspondante
     */
    public static Commande fromCommandeSummarryDTO(CommandeSummarryDTO commandeSummarryDTO, List<Produit> produits) {
        if (commandeSummarryDTO == null) {
            throw new IllegalArgumentException("CommandeSummarryDTO ne peut pas être null");
        }

        Commande commande = new Commande();
        commande.setId(commandeSummarryDTO.id());
        commande.setProduits(produits); // Assurez-vous que produits n'est pas null avant d'appeler setProduits()
        commande.setTotalAchat(commandeSummarryDTO.totalAchat());
        commande.setQuantite(commandeSummarryDTO.quantite());
        commande.setStatut(commandeSummarryDTO.status());
        return commande;
    }
}
