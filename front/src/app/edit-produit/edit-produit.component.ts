import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProduitsService } from '../services/produits.service';
import { NgForm } from '@angular/forms';
import { Produit } from '../models/produit';
import { from } from 'rxjs';
import { CategorieService } from '../services/categorie.service';
import { Categorie } from '../models/categorie';
import { FileUploadService } from '../services/file-upload.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-edit-produit',
  templateUrl: './edit-produit.component.html',
  styleUrls: ['./edit-produit.component.css']
})
export class EditProduitComponent implements OnInit{
  
  categories: Categorie[] = [];
  produit!:Produit;
  errName: string="";
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  isAdmin = false;
  isUser = false;
  constructor(private router:Router,
    private route:ActivatedRoute,private authService: AuthService,
     private produiService:ProduitsService, 
     private categorieService:CategorieService,
     private fileUploadService: FileUploadService,
     @Inject('baseURL') public baseURL:any){}
  
  ngOnInit(): void {
    this.categorieService.getAllCategories().subscribe({
      next:(categories:Categorie[])=>{this.categories=categories}
     })

     this.route.paramMap.subscribe(
      (result)=>{
        let id=result.get('id')
        //update
        if(id!="-1")this.initProduit(id);
        else this.produit=new Produit(null)
      }
    )

    // this.isAdmin = this.authService.isAdmin();
    // this.isUser = this.authService.isUser();
  }



  initProduit(id:any){
    this.produiService.getProduitById(id)
    .subscribe(produit=>{this.produit=produit});
  }


  onSubmit(){
      //ajout
      if(this.produit.id==null){
        this.produit.categorieID = this.produit.categorieID; // Assurez-vous que c'est bien un nombre si nécessaire

         this.produiService.addonAddProduit(this.produit).subscribe({
        next:(produit:Produit)=>{
          // this.router.navigateByUrl("/produits/"+produit.id) },
          this.errName="";
          this.upload(produit);},
          
        error:(error)=>{
          this.errName = error.message;
          console.log("error")},
        complete: ()=>console.log("fin")
      });
      
      //modif
    }else{
      this.produiService.updateProduit(this.produit).subscribe({
        next:(produit:Produit)=>{
          this.errName="";
          this.upload(produit);},
        error:(error)=>{
          this.errName = error.message;
          console.log("error")},
        complete: ()=>console.log("fin")
      });
    }
      }

     
  onCategorie(){
    this.router.navigateByUrl('/produits')
  }


  selectFile(event: any): void {
    // This function is called when a file is selected by the user
    // It assigns the selected file(s) to the selectedFiles property
    this.selectedFiles = event.target.files;
  }

  upload(produit: Produit): void {
    // This function uploads the selected file(s) to the server

    // Reset progress to 0 at the beginning of the upload
    this.progress = 0;

    // Check if there are selected files
    if (this.selectedFiles) {
      // Get the first selected file
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        // Assign the current file being uploaded
        this.currentFile = file;

        // Upload the file using the fileUploadService
        this.fileUploadService.upload(this.currentFile, produit.id).subscribe({
          next: (event: any) => {
            // Progress event: Update progress bar
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            }
            // Response event: Handle successful upload
            else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              // Redirect to Produit details page after successful upload
              this.router.navigateByUrl('/produits/' + produit.id);
             //Desactiver le spinner
            }
          },
          error: (err: any) => {
            // Handle error
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }
            this.currentFile = undefined;
          }
        });
      } else {
        // Reset selectedFiles if no file is selected
        this.selectedFiles = undefined;
        // Redirect to Produit details page
        this.router.navigateByUrl('/produits/' + produit.id);
     //Desactiver le spinner
      }
    } else {
      // Redirect to Produit details page 
      this.router.navigateByUrl('/produits/' + produit.id);
      //Desactiver le spinner
    }
  }
}