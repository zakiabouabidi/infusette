package com.example.infusette.web.controllers;

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
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.stream.Collectors;
import com.example.infusette.business.services.CategorieService;
import com.example.infusette.business.services.ProduitService;
import com.example.infusette.dao.entites.Categorie;
import com.example.infusette.dao.entites.Produit;
import com.example.infusette.exception.DuplicateCategorieException;
import com.example.infusette.web.dto.CategorieSummaryDTO;
import com.example.infusette.web.dto.ProduitSummaryDTO;
@RestController

@RequestMapping("/api/categories")
// @PreAuthorize("hasAnyRole('ADMIN','USER')")

public class CategorieController {

     @Autowired
    ProduitService produitService;
    @Autowired
    CategorieService categorieService;
    public CategorieController(CategorieService categorieService) {
        this.categorieService = categorieService;
    }

     @GetMapping()
   
    public ResponseEntity<?> getAllCategorie() {
 List<CategorieSummaryDTO> categories = this.categorieService.getAllCategorie()
                .stream()
                .map(CategorieSummaryDTO::toCategorieSummaryDTO)
               .collect(Collectors.toList());     
        return new ResponseEntity<>(categories, HttpStatus.OK);
       
    }
   
         @GetMapping("/{id}")
  
     public ResponseEntity<?> getCategorieById(@PathVariable Long id) throws Exception {
        CategorieSummaryDTO categorie = CategorieSummaryDTO.toCategorieSummaryDTO(this.categorieService.getCategorieById(id));
        return new ResponseEntity<>(categorie, HttpStatus.OK);
        
    }

    @PostMapping()
    @PreAuthorize("hasAuthority('WRITE_PRIVILEGE') and hasRole('ADMIN')")
   
    public ResponseEntity<?> addCategorie(@RequestBody CategorieSummaryDTO categorieSummaryDTO) throws  DuplicateCategorieException{
         Categorie categorie = CategorieSummaryDTO.fromCategorieSummaryDTO(categorieSummaryDTO);
        return new ResponseEntity<>(this.categorieService.addCategorie(categorie), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('WRITE_PRIVILEGE') and hasRole('ADMIN')")
   
   public ResponseEntity<?> updateCategorie(@PathVariable Long id, @RequestBody CategorieSummaryDTO categorieSummaryDTO) throws DuplicateCategorieException {
        Categorie categorie = CategorieSummaryDTO.fromCategorieSummaryDTO(categorieSummaryDTO);
        Categorie SavedCategory =this.categorieService.updateCategorie(id, categorie);
        return new ResponseEntity<>(CategorieSummaryDTO.toCategorieSummaryDTO(SavedCategory), HttpStatus.OK);
    }


    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('DELETE_PRIVILEGE') and hasRole('ADMIN')")
    
   public ResponseEntity<?> deleteCategorieById(@PathVariable Long id) {
        this.categorieService.deleteCategorieById(id);
        return new ResponseEntity<>( HttpStatus.NO_CONTENT);
    }  
}
