// src/app/models/coffret.ts
export interface Coffret {
    id: number;
    nom: string;
    prix: number;
    quantite: number;
    produitIds: number[];
  }
  