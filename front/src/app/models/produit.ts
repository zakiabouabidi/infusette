export class Produit {
  id: any;
  name!: string;
  prix!: any;
  quantite!: any;
  ingredients!:string;
  description!: string;
  categorieID!: any;
  categorienamme!: string;
  image!: string;
  prixTotal!: number;

  constructor(id: any) {
      this.id = id;
  }
}
