import { Injectable } from '@angular/core';

// Interface representing a user object
export interface User {
  id: number;
  email: string;
  displayName: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  
  // Key used for storing user data in localStorage
  private storageKey = 'loggedInUser';

  constructor() { }

  // Save user to localStorage
  setUser(user: User) {
    localStorage.setItem(this.storageKey, JSON.stringify(user));
  }

  // Get user from localStorage
  getUser(): User | null {
    const userJson = localStorage.getItem(this.storageKey);
    return userJson ? JSON.parse(userJson) : null;
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return !!this.getUser();
  }

  // Remove user (logout)
  clearUser() {
    localStorage.removeItem(this.storageKey);
  }
}
