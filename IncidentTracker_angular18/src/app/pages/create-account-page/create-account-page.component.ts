import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MasterService } from '../../service/master.service';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-account-page',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './create-account-page.component.html',
  styleUrl: './create-account-page.component.css'
})
export class CreateAccountPageComponent {

  // Form-bound object for new user data
  newUserObj: any = {
    Id: 0,
    Email: '',
    DisplayName: '',
    Role: ''
  };

  showEmailError = false;
  showDisplayNameError = false;
  showRoleError = false;

  constructor(
    private masterSrv: MasterService,
    private authService: AuthService,
    private router: Router
  ) {}

  // Called when user clicks "Save"
  onSave() {
    this.showEmailError = !this.newUserObj.Email.match(/^\S+@\S+\.\S+$/);
    this.showDisplayNameError = !this.newUserObj.DisplayName.trim();
    this.showRoleError = !this.newUserObj.Role;

    if (this.showEmailError || this.showDisplayNameError || this.showRoleError) {
      return;
    }

    const email = this.newUserObj.Email;

    // Basic client-side email validation
    if (!email || !email.match(/^\S+@\S+\.\S+$/)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Check if email already exists
    this.masterSrv.checkEmailExists(email).subscribe({
      next: exists => {
        if (exists) {
          alert('This email address is already taken. Please choose another.');
        } else {
          this.createUser(); // Proceed to create the user
        }
      },
      error: err => this.handleError(err)
    });
  }

  // Create the user and log them in
  createUser() {
    this.masterSrv.createUser(this.newUserObj).subscribe({
      next: (response: any) => {
        alert('User created successfully!');
        this.authService.setUser(response); // Save user in local storage/session
        this.router.navigate(['/incident-list']); // Redirect after success
      },
      error: err => this.handleError(err)
    });
  }

  // Centralized HTTP error handler
  private handleError(err: any) {
    if (err.status === 400 && err.error?.errors) {
      const messages = Object.values(err.error.errors).flat().join('\n');
      alert(`Please fix the following:\n${messages}`);
    } else if (err.status === 409) {
      alert('A user with this email already exists.');
    } else {
      alert('An unexpected error occurred. Please try again.');
    }

    console.error('HTTP error:', err);
  }
}
