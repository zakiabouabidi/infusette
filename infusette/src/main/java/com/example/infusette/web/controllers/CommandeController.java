package com.example.infusette.web.controllers;

import com.example.infusette.business.services.CommandeService;
import com.example.infusette.dao.entites.Commande;
import com.example.infusette.dao.entites.Produit;
import com.example.infusette.web.dto.CommandeSummarryDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/commandes")

@PreAuthorize("hasAnyRole('ADMIN','USER')")
public class CommandeController {

    @Autowired
    private CommandeService commandeService;


    public CommandeController(CommandeService commandeService) {
        this.commandeService = commandeService;
    }

    @PostMapping("/confirm")
    
    @PreAuthorize("hasAuthority('WRITE_PRIVILEGE') and hasRole('ADMIN')")
    public ResponseEntity<Commande> confirmerCommande(@RequestBody Commande commande) {
        Commande confirmedCommande = commandeService.confirmCommande(commande);
        return ResponseEntity.ok().body(confirmedCommande);
    }

    @GetMapping("")
    
    @PreAuthorize("hasAnyRole('ADMIN', 'USER') and hasAuthority('READ_PRIVILEGE')")
    public ResponseEntity<List<CommandeSummarryDTO>> getAllCommande() {
        List<CommandeSummarryDTO> commandes = commandeService.getAllCommande()
                .stream()
                .map(CommandeSummarryDTO::toCommandeSummarryDTO)
                .collect(Collectors.toList());
        return new ResponseEntity<>(commandes, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    
    @PreAuthorize("hasAnyRole('ADMIN', 'USER') and hasAuthority('READ_PRIVILEGE')")
    public ResponseEntity<CommandeSummarryDTO> getCommandeById(@PathVariable Long id) throws Exception {
        Commande commande = commandeService.getCommandeById(id);
        return ResponseEntity.ok(CommandeSummarryDTO.toCommandeSummarryDTO(commande));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('WRITE_PRIVILEGE') and hasRole('ADMIN')")
   
    public ResponseEntity<CommandeSummarryDTO> updateStatut(@PathVariable Long id,
            @RequestBody CommandeSummarryDTO commandeSummarryDTO) throws Exception {
        List<Produit> produits = commandeService.getProduitById(commandeSummarryDTO.produitIds());
        Commande commande = CommandeSummarryDTO.fromCommandeSummarryDTO(commandeSummarryDTO, produits);
        commande.setId(id);
        Commande updatedCommande = commandeService.UpdateStatut(id, commande);
        return ResponseEntity.ok(CommandeSummarryDTO.toCommandeSummarryDTO(updatedCommande));
    }
}
