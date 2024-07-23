package com.example.infusette.web.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.infusette.business.services.FilesStorageService;
import com.example.infusette.business.services.ProduitService;
import com.example.infusette.web.models.responses.ResponseMessage;
/*
	PATCH /api/storage/upload/{id} : Cet endpoint permet  d’uploader  un fichier (image) et de l'associer à un produit spécifique identifié par son ID
	GET /api/storage/files/{filename:.+}: Cet endpoint permet de récupérer un fichier (image) à partir du stockage en utilisant son nom de fichier.
*/
@RestController
@RequestMapping("/api/storage")
//@CrossOrigin("http://localhost:4200")
public class FilesStorageController {

  @Autowired
  FilesStorageService storageService;
  @Autowired
  ProduitService produitService;

  @PatchMapping("/upload/{id}")
  public ResponseEntity<ResponseMessage> uploadFile(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
    String message = "";
    try {
      String filename = storageService.save(file);
      // update produit
      this.produitService.updateProduitImage(id, filename);
      message = "Uploaded the file successfully: " + file.getOriginalFilename();
      return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
    } catch (Exception e) {
      message = "Could not upload the file: " + file.getOriginalFilename() + ". Error: " + e.getMessage();
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseMessage(message));
    }
  }
  
  @GetMapping("/files/{filename:.+}")
  // The ".+" pattern in @PathVariable captures the full filename, including extensions.
  @ResponseBody
  public ResponseEntity<?> getFile(@PathVariable String filename) {
    String message = "";
    try {
      Resource file = storageService.load(filename);
      return ResponseEntity.ok().body(file);
    } catch (Exception e) {
      message = "Could not get the file: " + filename;
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseMessage(message));
    }
  }

}
