package com.example.infusette.business.servicesImpl;

import com.example.infusette.business.services.CoffretService;
import com.example.infusette.dao.entites.Coffret;
import com.example.infusette.dao.repositories.CoffretRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CoffretServiceImpl implements CoffretService {

    @Autowired
    private CoffretRepository coffretRepository;

    @Override
    public List<Coffret> getAllCoffrets() {
        return coffretRepository.findAll();
    }

    @Override
    public Coffret getCoffretById(Long id) throws Exception {
        Optional<Coffret> coffret = coffretRepository.findById(id);
        if (coffret.isPresent()) {
            return coffret.get();
        } else {
            throw new Exception("Coffret not found");
        }
    }

    @Override
    public Coffret addCoffret(Coffret coffret) {
        return coffretRepository.save(coffret);
    }

    @Override
    public Coffret updateCoffret(Long id, Coffret coffretDetails) throws Exception {
        Coffret coffret = getCoffretById(id);
        coffret.setNom(coffretDetails.getNom());
        coffret.setPrix(coffretDetails.getPrix());
        coffret.setQuantite(coffretDetails.getQuantite());
        coffret.setProduits(coffretDetails.getProduits());
        return coffretRepository.save(coffret);
    }

    @Override
    public void deleteCoffretById(Long id) {
        coffretRepository.deleteById(id);
    }
}
