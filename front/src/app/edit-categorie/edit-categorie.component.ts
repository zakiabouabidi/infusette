import { Component, Inject, OnInit } from '@angular/core';
import { CategorieService } from '../services/categorie.service';
import { Categorie } from '../models/categorie';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUploadService } from '../services/file-upload.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-categorie',
  templateUrl: './edit-categorie.component.html',
  styleUrls: ['./edit-categorie.component.css']
})
export class EditCategorieComponent implements OnInit{
  
  categorie!:Categorie;
  errName: string="";
  
  isLoading: boolean = false;

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  constructor(private router:Router ,
    private route:ActivatedRoute, 
    private categorieservice:CategorieService,
    private fileUploadService: FileUploadService,
    @Inject('baseURL') public baseURL:any){}
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (result)=>{
        let id=result.get('id')
        if(id!="-1")this.initCategorie(id);
        else this.categorie=new Categorie(null)

      }
    )
  }


  onCategorie(){
    this.router.navigateByUrl('/categories')
  }

  onSubmit(){
    this.isLoading = true; // Enable loading upon form submission
    if (this.categorie.id == null) {
      this.categorieservice.addonAddCategorie(this.categorie)
        .subscribe({
          next: (categorie: Categorie) => {
                 this.errName="";
                 this.upload(categorie);
          },
          error: (error) => {
            this.errName = error.message;
            this.isLoading = false; //Desactiver le spinner
          }
        })
    } else {
      this.categorieservice.updateCategorie(this.categorie)
        .subscribe({
          next: (categorie: Categorie) => {
            this.errName="";
            this.upload(categorie);
          },
          error: (error) => {
            this.errName = error.message;
            this.isLoading = false; //Desactiver le spinner
          }
        })
    };
   
  }

  
 initCategorie(id:any){
  this.categorieservice.getCategorieById(id).subscribe({
    next:(categorie)=>this.categorie=categorie,
    error:(erro)=>console.log("error")
  })
}

/*upload file*/
selectFile(event: any): void {
  // This function is called when a file is selected by the user
  // It assigns the selected file(s) to the selectedFiles property
  this.selectedFiles = event.target.files;
}

upload(categorie: Categorie): void {
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
      this.fileUploadService.upload(this.currentFile, categorie.id).subscribe({
        next: (event: any) => {
          // Progress event: Update progress bar
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round(100 * event.loaded / event.total);
          }
          // Response event: Handle successful upload
          else if (event instanceof HttpResponse) {
            this.message = event.body.message;
            // Redirect to categorie details page after successful upload
            this.router.navigateByUrl('/categories/' + categorie.id);
            this.isLoading = false; //Desactiver le spinner
          }
        },
        error: (error: any) => {
          // Handle error
          console.log(error);
          this.progress = 0;

          if (error.error && error.error.message) {
            this.message = error.error.message;
          } else {
            this.message = 'Could not upload the file!';
          }
          this.currentFile = undefined;
        }
      });
    } else {
      // Reset selectedFiles if no file is selected
      this.selectedFiles = undefined;
      // Redirect to categorie details page
      this.router.navigateByUrl('/categories/' + categorie.id);
      this.isLoading = false; //Desactiver le spinner
    }
  } else {
    // Redirect to categorie details page 
    this.router.navigateByUrl('/categories/' + categorie.id);
    this.isLoading = false; //Desactiver le spinner
  }
}

}
