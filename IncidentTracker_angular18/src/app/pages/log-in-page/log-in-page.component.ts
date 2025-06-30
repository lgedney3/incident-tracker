import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MasterService } from '../../service/master.service';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-log-in-page',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './log-in-page.component.html',
  styleUrl: './log-in-page.component.css'
})
export class LogInPageComponent {

  email: string = '';
  showEmailError = false;

  constructor(
    private masterSrv: MasterService,
    private authService: AuthService,
    private router: Router
  ) {}

  // Called when user submits the login form
  onSubmit() {
    // Basic email format validation
    if (!this.email || !this.email.match(/^\S+@\S+\.\S+$/)) {
      this.showEmailError = true;
      return;
    }

    this.showEmailError = false;

    // Check if a user exists with this email
    this.masterSrv.checkEmailExists(this.email).subscribe(
      exists => {
        if (exists) {
          this.login();
        } else {
          alert('No account exists with this email address');
        }
      },
      error => this.handleError(error)
    );
  }

  // Load user details and navigate to incident list
  private login() {
    this.masterSrv.getUserByEmail(this.email).subscribe({
      next: user => {
        this.authService.setUser(user); // Save to local storage
        this.router.navigate(['/incident-list']); // Redirect after login
      },
      error: err => this.handleError(err)
    });
  }

  // Centralized HTTP error handler
  private handleError(err: any) {
    if (err.status === 400 && err.error?.errors) {
      const messages = Object.values(err.error.errors).flat().join('\n');
      alert(`Please fix the following:\n${messages}`);
    } else if (err.status === 404) {
      alert('User not found.');
    } else {
      alert('An unexpected error occurred. Please try again.');
    }

    console.error('HTTP error:', err);
  }
  
}
