import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from '../../service/master.service';
import { AuthService } from '../../service/auth.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-incident-response',
  standalone: true,
  imports: [DatePipe, FormsModule, CommonModule],
  templateUrl: './incident-response.component.html',
  styleUrl: './incident-response.component.css'
})
export class IncidentResponseComponent implements OnInit {

  // Incident & form data
  incidentId: number = 0;
  incident: any = null;
  incidentCreatorName: string = '';
  selectedStatus: string = '';
  resolutionNote: string = '';

  // Current user data
  currentUserDisplayName: string = '';
  currentUserRole: string = '';

  // Status history
  statusHistory: any[] = [];
  statusHistoryDisplayNames: { [userId: number]: string } = {};

  // UI state toggles
  showHistory = true;
  showResponseForm = true;

  constructor(
    private route: ActivatedRoute,
    private masterSrv: MasterService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.getUser();
    this.currentUserDisplayName = currentUser?.displayName || 'Unknown';
    this.currentUserRole = currentUser?.role || '';

    // Hide response form if user is an Employee
    if (this.currentUserRole === 'Employee') {
      this.showHistory = true;
      this.showResponseForm = false;
    }

    // Load incident by ID from route params
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.incidentId = +idParam;
        this.loadIncident(this.incidentId);
      }
    });
  }

  // Load the incident and status history
  loadIncident(id: number) {
    this.masterSrv.getIncidentById(id).subscribe({
      next: data => {
        this.incident = data;
        this.selectedStatus = (data as any).status;
        this.loadStatusHistory(id);

        this.masterSrv.getDisplayNameById((data as any).createdByUserId).subscribe({
          next: res => this.incidentCreatorName = res.displayName,
          error: err => this.handleError(err)
        });
      },
      error: err => this.handleError(err)
    });
  }

  // Load status history and fetch display names for user IDs
  loadStatusHistory(id: number) {
    this.masterSrv.getStatusHistoryByIncidentId(id).subscribe({
      next: data => {
        this.statusHistory = data;
        const userIds = [...new Set(data.map(entry => entry.changedByUserId))];

        userIds.forEach(userId => {
          this.masterSrv.getDisplayNameById(userId).subscribe({
            next: res => this.statusHistoryDisplayNames[userId] = res.displayName,
            error: err => this.handleError(err)
          });
        });
      },
      error: err => this.handleError(err)
    });
  }

  toggleHistory() {
    this.showHistory = !this.showHistory;
  }

  goToIncidentList() {
    this.router.navigate(['/incident-list']);
  }

  // Save updated incident and status change
  onUpdateIncident() {
    if (!this.incident) return;

    const updatedIncident = {
      ...this.incident,
      status: this.selectedStatus,
      lastUpdatedAt: new Date()
    };

    const statusChange = {
      incidentId: this.incident.id,
      fromStatus: this.incident.status,
      toStatus: this.selectedStatus,
      changedAt: new Date(),
      changedByUserId: this.authService.getUser()?.id || 0,
      note: this.resolutionNote
    };

    this.masterSrv.updateIncident(updatedIncident).subscribe({
      next: () => {
        this.masterSrv.createStatusChange(statusChange).subscribe({
          next: () => {
            alert('Incident updated successfully!');
            this.router.navigate(['/incident-list']);
          },
          error: err => this.handleError(err)
        });
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
      alert('Resource not found.');
    } else {
      alert('An unexpected error occurred. Please try again.');
    }

    console.error('HTTP error:', err);
  }
}