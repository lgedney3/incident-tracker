import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Interface representing a User object
export interface User {
  id: number;
  email: string;
  displayName: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  private baseUrl = 'https://localhost:7057/api/IncidentTrackerMaster';

  constructor(private http: HttpClient) {}

  // User related methods
  createUser(obj: any) {
    return this.http.post(`${this.baseUrl}/users`, obj);
  }

  getUsers() {
    return this.http.get(`${this.baseUrl}/users`);
  }

  // Checks whether a user with the given email already exists in the database.
  // Used to validate the email is unique during account creation.
  checkEmailExists(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/users/exists`, {
      params: { email }
    });
  }

  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/by-email`, {
      params: { email }
    });
  }

  getDisplayNameById(id: number) {
    return this.http.get<{ displayName: string }>(`${this.baseUrl}/users/${id}/display-name`);
  }

  // Incident related methods
  createIncident(obj: any) {
    return this.http.post(`${this.baseUrl}/incidents`, obj);
  }

  updateIncident(obj: any) {
    return this.http.put(`${this.baseUrl}/incidents`, obj);
  }

  deleteIncident(id: number) {
    return this.http.delete(`${this.baseUrl}/incidents/${id}`);
  }

  getAllIncidents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/incidents`);
  }

  getIncidentById(id: number) {
    return this.http.get(`${this.baseUrl}/incidents/${id}`);
  }

  // Status history related methods
  createStatusChange(statusChange: any) {
    return this.http.post(`${this.baseUrl}/incidents/status-changes`, statusChange);
  }

  getStatusHistoryByIncidentId(incidentId: number) {
    return this.http.get<any[]>(`${this.baseUrl}/incidents/${incidentId}/status-changes`);
  }
}