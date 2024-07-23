package com.example.infusette.dao.entites;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

import com.example.infusette.dao.Status;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "commande")
public class Commande {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinTable(
        name = "commande_produit",
        joinColumns = @JoinColumn(name = "commande_id"),
        inverseJoinColumns = @JoinColumn(name = "produit_id")
    )
    private List<Produit> produits = new ArrayList<>(); // Initialize the list

    private double totalAchat;
    private int quantite;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status statut = Status.EN_ATTENTE;  // Valeur par défaut
}
