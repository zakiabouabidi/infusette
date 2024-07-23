package com.example.infusette.web.controllers;

import com.example.infusette.business.services.CoffretService;
import com.example.infusette.business.services.ProduitService;
import com.example.infusette.dao.entites.Coffret;
import com.example.infusette.dao.entites.Produit;
import com.example.infusette.web.dto.CoffretDTO;
import com.example.infusette.web.dto.ProduitDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/coffrets")
public class CoffretController {

    @Autowired
    private CoffretService coffretService;

    @Autowired
    private ProduitService produitService;

    @GetMapping("")
    public ResponseEntity<List<CoffretDTO>> getAllCoffrets() {
        List<CoffretDTO> coffrets = coffretService.getAllCoffrets()
                .stream()
                .map(CoffretDTO::toCoffretDTO)
                .collect(Collectors.toList());
        return new ResponseEntity<>(coffrets, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CoffretDTO> getCoffretById(@PathVariable Long id) throws Exception {
        CoffretDTO coffret = CoffretDTO.toCoffretDTO(coffretService.getCoffretById(id));
        return new ResponseEntity<>(coffret, HttpStatus.OK);
    }

    @PostMapping("")
    @PreAuthorize("hasAuthority('WRITE_PRIVILEGE') and hasRole('ADMIN')")
    public ResponseEntity<CoffretDTO> addCoffret(@RequestBody CoffretDTO coffretDTO) {
        List<Produit> produits = produitService.getProduitsByIds(coffretDTO.produitIds());
        Coffret coffret = CoffretDTO.fromCoffretDTO(coffretDTO, produits);
        Coffret savedCoffret = coffretService.addCoffret(coffret);
        return new ResponseEntity<>(CoffretDTO.toCoffretDTO(savedCoffret), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('WRITE_PRIVILEGE') and hasRole('ADMIN')")
    public ResponseEntity<CoffretDTO> updateCoffret(@PathVariable Long id, @RequestBody CoffretDTO coffretDTO) throws Exception {
        List<Produit> produits = produitService.getProduitsByIds(coffretDTO.produitIds());
        Coffret coffret = CoffretDTO.fromCoffretDTO(coffretDTO, produits);
        Coffret updatedCoffret = coffretService.updateCoffret(id, coffret);
        return new ResponseEntity<>(CoffretDTO.toCoffretDTO(updatedCoffret), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('DELETE_PRIVILEGE') and hasRole('ADMIN')")
    public ResponseEntity<Void> deleteCoffretById(@PathVariable Long id) {
        coffretService.deleteCoffretById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
