import { Component, Inject, OnInit } from '@angular/core';
import { CategorieService } from '../services/categorie.service';
import { Categorie } from '../models/categorie';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail-categorie',
  templateUrl: './detail-categorie.component.html',
  styleUrls: ['./detail-categorie.component.css']
})
export class DetailCategorieComponent implements OnInit {

  categorie: Categorie | undefined;
  idcategorie: any;

  constructor(private categorieService: CategorieService,
    private router: Router, private route: ActivatedRoute,
    @Inject('baseURL') public baseURL: any) { }
    
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.idcategorie = (params.get('id'));
      this.categorieService.getCategorieById(this.idcategorie).subscribe(
        (categorie) => { this.categorie = categorie }

      )
    });

  }




  onAddCategorie() {
    this.router.navigateByUrl('/categories/edit/-1')
  }
}

