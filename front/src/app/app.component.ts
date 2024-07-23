import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { PanierService } from './services/panier.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // Title of the project
  title = 'Infusette';
  totalProduitsPanier: number = 0;

  // Indicates if the user is authenticated
  isAuth: boolean = false;

  // Shows admin board if user has admin role
  showAdminBoard = false;

  // Injecting AuthService and Router into the component
  constructor(private authService: AuthService, private router:Router,private panierService: PanierService) { }

  // Initialization logic
  ngOnInit(): void {
    // Attempt to auto-login the user
    this.authService.autoLogin();

    // Subscribe to the AuthenticatedUser$ observable
    this.authService.AuthenticatedUser$.subscribe({
      next: user => { 
        // If user is authenticated
        if(user) {
          // Show admin board if user has admin role
          this.showAdminBoard = user.role.name === 'ROLE_ADMIN';
          this.isAuth = true;
        } else {
          // For sign out
          this.showAdminBoard=false;
          this.isAuth = false;
        }
      }
    })
  
    this.panierService.getPanierObservable().subscribe(panier => {
      this.totalProduitsPanier = this.panierService.getTotalProduits();
    });
  
  }

  // Sign out logic
  onSignOut() {
    this.authService.logout();
  }
}
