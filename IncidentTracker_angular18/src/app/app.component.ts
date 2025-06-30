import { Component } from '@angular/core';
import { RouterModule, RouterLink, RouterOutlet, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, RouterLink, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'IncidentTracker_angular18';

  // Controls whether the navbar should be hidden (used on login and create account pages)
  hideNavbar = false;

  // Stores the currently logged-in user object
  currentUser: any = null;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    // Subscribe to route changes to determine whether to show the navbar
    // and to update the current user info when navigating between pages
    this.router.events.subscribe(() => {
      this.hideNavbar = ['/login', '/create-account'].includes(this.router.url);
      this.currentUser = this.authService.getUser();
    });
  }

  // Logs out the user, clears local storage, and redirects to the login page
  logout() {
    this.authService.clearUser(); // Clear stored user info
    this.currentUser = null;
    this.router.navigate(['/login']); // Redirect to login page
  }
}

