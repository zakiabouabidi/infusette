package com.example.infusette.business.services;

import java.util.List;

import com.example.infusette.dao.entites.Produit;


public interface ProduitService {
    //Read opérations
    List<Produit> getAllProduit();
    Produit getProduitById(Long id) throws Exception;
    //create
    List<Produit> findByCategorieId(Long idcat);
   Produit addProduit(Produit produit);
    //Update
    Produit updateProduit(Long id,Produit produit)throws Exception;
    //Delete
    void deleteProduitById(Long id);
    Produit updateProduitImage (Long id,String filename);
    List<Produit> getProduitsByIds(List<Long> ids);
}