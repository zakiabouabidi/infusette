package com.example.infusette.web.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.example.infusette.business.services.CategorieService;
import com.example.infusette.business.services.ProduitService;
import com.example.infusette.dao.entites.Categorie;
import com.example.infusette.dao.entites.Produit;
import com.example.infusette.web.dto.ProduitSummaryDTO;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/api/produits")

// @PreAuthorize("hasAnyRole('ADMIN','USER')")

public class ProduitController {

    @Autowired
    ProduitService produitService;
    @Autowired
    CategorieService categorieService;

    @GetMapping("")
    //   @PreAuthorize("hasAnyRole('ADMIN', 'USER') and hasAuthority('READ_PRIVILEGE')")
   
    public ResponseEntity<?> getAllProduit() {
        List<ProduitSummaryDTO> produit = produitService.getAllProduit()
                .stream()
                .map(ProduitSummaryDTO::toProduitSummaryDTO)
                .collect(Collectors.toList());
        return new ResponseEntity<>(produit, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    
    // @PreAuthorize("hasAnyRole('ADMIN', 'USER') and hasAuthority('READ_PRIVILEGE')")
    public ResponseEntity<?> getProduitById(@PathVariable Long id) throws Exception {
        ProduitSummaryDTO produit = ProduitSummaryDTO.toProduitSummaryDTO(this.produitService.getProduitById(id));
        return new ResponseEntity<>(produit, HttpStatus.OK);
    }

    @GetMapping("/categorie/{idcat}")
    public ResponseEntity<?> getProduitsByCategorieId(@PathVariable Long idcat) {
        List<ProduitSummaryDTO> produits = produitService.findByCategorieId(idcat)
                .stream()
                .map(ProduitSummaryDTO::toProduitSummaryDTO)
                .collect(Collectors.toList());
        return new ResponseEntity<>(produits, HttpStatus.OK);
    }
    

    @PostMapping()
    
    @PreAuthorize("hasAuthority('WRITE_PRIVILEGE') and hasRole('ADMIN')")
    public ResponseEntity<?> addProduit(@RequestBody ProduitSummaryDTO categorieSummaryDTO) throws Exception {
        Produit produit = ProduitSummaryDTO.fromProduitSummaryDTO(categorieSummaryDTO);
        Categorie categorie = categorieService.getCategorieById(categorieSummaryDTO.categorieID());
        produit.setCategorie(categorie);
        Produit savedProduct =this.produitService.addProduit( produit);

        return new ResponseEntity<>(ProduitSummaryDTO.toProduitSummaryDTO(savedProduct), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('WRITE_PRIVILEGE') and hasRole('ADMIN')")
   
    public ResponseEntity<?> updateProduit(@PathVariable Long id, @RequestBody ProduitSummaryDTO categorieSummaryDTO)throws Exception {
        Produit produit = ProduitSummaryDTO.fromProduitSummaryDTO(categorieSummaryDTO);
        Categorie categorie = categorieService.getCategorieById(categorieSummaryDTO.categorieID());
        produit.setCategorie(categorie);
        Produit savedProduct =this.produitService.updateProduit(id, produit);

        return new ResponseEntity<>(ProduitSummaryDTO.toProduitSummaryDTO(savedProduct), HttpStatus.OK);

    }

  

    // il faut faire appel à ProduitDto pas a Produit pour eviter l'erreur d'affichage de details de tt categories
    // @PutMapping("/{id}")

    // public ResponseEntity<?> updateProduit(@PathVariable Long id, @RequestBody ProduitSummaryDTO categorieSummaryDTO)throws Exception {
    //     Produit produit = ProduitSummaryDTO.fromProduitSummaryDTO(categorieSummaryDTO);
    //     Categorie categorie = categorieService.getCategorieById(categorieSummaryDTO.categorieID());
    //     produit.setCategorie(categorie);
    //     Produit savedProduct =this.produitService.updateProduit(id, produit);

    //     return new ResponseEntity<>(ProduitSummaryDTO.toProduitSummaryDTO(savedProduct), HttpStatus.OK);

    // }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('DELETE_PRIVILEGE') and hasRole('ADMIN')")
   
    public ResponseEntity<?> deleteProduitById(@PathVariable Long id) {
        this.produitService.deleteProduitById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
