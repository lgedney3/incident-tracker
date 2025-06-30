import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MasterService } from '../../service/master.service';
import { AuthService } from '../../service/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-incident',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './new-incident.component.html',
  styleUrl: './new-incident.component.css'
})
export class NewIncidentComponent implements OnInit {

  userId: number = 0;
  isEditMode = false;

  showTitleError = false;
  showDescriptionError = false;
  showUrgencyError = false;

  // Object bound to the form fields
  newIncidentObj: any = {
    Id: 0,
    Title: '',
    Description: '',
    Location: '',
    Urgency: '',
    Status: 'Open',
    CreatedAt: new Date(),
    CreatedByUserId: 0,
    LastUpdatedAt: new Date()
  };

  constructor(
    private masterSrv: MasterService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUser();

    // Redirect if user is not logged in
    if (!user || !user.id) {
      alert('User not found. Please log in again.');
      this.router.navigate(['/login']);
      return;
    }

    this.userId = user.id;
    this.newIncidentObj.CreatedByUserId = this.userId;

    // Edit mode: populate form with existing incident
    const incidentId = this.route.snapshot.paramMap.get('id');
    if (incidentId) {
      this.isEditMode = true;
      this.masterSrv.getIncidentById(+incidentId).subscribe(
        (incident: any) => {
          this.newIncidentObj = { ...incident };
        },
        error => {
          this.handleError(error);
          this.router.navigate(['/incident-list']);
        }
      );
    }
  }

  // Save or update the incident
  onSave() {

    this.showTitleError = !this.newIncidentObj.title?.trim();
    this.showDescriptionError = !this.newIncidentObj.description?.trim();
    this.showUrgencyError = !this.newIncidentObj.urgency;

    if (this.showTitleError || this.showDescriptionError || this.showUrgencyError) return;

    if (this.isEditMode) {
      this.masterSrv.updateIncident(this.newIncidentObj).subscribe(
        () => {
          alert('Incident updated successfully!');
          this.router.navigate(['/incident-list']);
        },
        error => this.handleError(error)
      );
    } else {
      this.masterSrv.createIncident(this.newIncidentObj).subscribe(
        () => {
          alert('Incident created successfully!');
          this.router.navigate(['/incident-list']);
        },
        error => this.handleError(error)
      );
    }
  }

  // Navigate back to the incident list
  goToIncidentList() {
    this.router.navigate(['/incident-list']);
  }

  // Centralized HTTP error handler
  private handleError(err: any) {
    if (err.status === 400 && err.error?.errors) {
      const messages = Object.values(err.error.errors).flat().join('\n');
      alert(`Please fix the following:\n${messages}`);
    } else if (err.status === 404) {
      alert('Incident not found.');
    } else {
      alert('An unexpected error occurred. Please try again.');
    }

    console.error('HTTP error:', err);
  }

}


