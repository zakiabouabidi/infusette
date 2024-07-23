package com.example.infusette.business.servicesImpl;

import java.util.List;

import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import com.example.infusette.business.services.FilesStorageService;
import com.example.infusette.business.services.ProduitService;
import com.example.infusette.dao.entites.Produit;
import com.example.infusette.dao.repositories.ProduitRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Service
public class ProduitServiceImpl implements ProduitService {

    private final ProduitRepository produitRepository;
    private final FilesStorageService filesStorageService;

    public ProduitServiceImpl(ProduitRepository produitRepository,
            FilesStorageService filesStorageService) {
        this.produitRepository = produitRepository;
        this.filesStorageService = filesStorageService;
    }

    @Override
    public List<Produit> getAllProduit() {
       return produitRepository.findAll();
    }

    @Override
    public Produit getProduitById(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("ID cannot be null");
        }

        return this.produitRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Produit with id: " + id + " not found"));
    }

    @Override
    public List<Produit> getProduitsByIds(List<Long> ids) {
        if (ids == null || ids.isEmpty()) {
            throw new IllegalArgumentException("ID list cannot be null or empty");
        }

        return produitRepository.findAllById(ids);  // Pas besoin d'Optional
    }

    @Override
    public Produit addProduit(Produit produit) {
        if (produit == null) {
            throw new IllegalArgumentException("Produit cannot be null");
        }
        return this.produitRepository.save(produit);
    }

    @Override
    public List<Produit> findByCategorieId(Long idcat) {
        if (idcat == null) {
            throw new IllegalArgumentException("Category ID cannot be null");
        }
        return this.produitRepository.findByCategorieId(idcat);
    }

    @Override
    public Produit updateProduit(Long id, Produit produit) {
        if (id == null || produit == null) {
            throw new IllegalArgumentException("ID and produit cannot be null");
        }

        Produit existingProduit = getProduitById(id);

        existingProduit.setName(produit.getName());
        existingProduit.setPrix(produit.getPrix());
        existingProduit.setQuantite(produit.getQuantite());
        existingProduit.setDescription(produit.getDescription());
        existingProduit.setIngredients(produit.getIngredients());
        existingProduit.setImage(produit.getImage());
        existingProduit.setCategorie(produit.getCategorie());

        return produitRepository.save(existingProduit);
    }

    @Override
    @Transactional
    public void deleteProduitById(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("ID cannot be null");
        }
        try {
            Produit produit = this.getProduitById(id);
            String filename = produit.getImage();
            if (filename != null) {
                filesStorageService.delete(filename);
            }
            produitRepository.deleteById(id);
        } catch (DataAccessException e) {
            throw new RuntimeException("Failed to delete produit with ID: " + id, e);
        }
    }

    @Override
    public Produit updateProduitImage(Long id, String filename) {
        if (id == null) {
            throw new IllegalArgumentException("ID cannot be null");
        }

        Produit produit = getProduitById(id);

        if (produit.getImage() != null) {
            filesStorageService.delete(produit.getImage());
        }
        produit.setImage(filename);
        return produitRepository.save(produit);
    }
}
