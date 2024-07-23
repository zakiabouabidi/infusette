package com.example.infusette.business.services;

import com.example.infusette.dao.entites.Commande;
import com.example.infusette.dao.entites.Produit;

import java.util.List;

public interface CommandeService {
    Commande confirmCommande(Commande commande);
    List<Commande> getAllCommande();
    Commande getCommandeById(Long id) throws Exception;
    Commande UpdateStatut(Long id, Commande commande) throws Exception;
    List<Produit> getProduitById(List<Long> produitIds);
}
