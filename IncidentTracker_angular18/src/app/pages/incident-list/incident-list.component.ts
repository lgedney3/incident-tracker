import { Component, OnInit } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { CommonModule, DatePipe, NgFor, NgIf } from '@angular/common';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-incident-list',
  standalone: true,
  imports: [DatePipe, FormsModule, NgFor, NgIf, CommonModule],
  templateUrl: './incident-list.component.html',
  styleUrl: './incident-list.component.css'
})
export class IncidentListComponent implements OnInit {

  // Current logged-in user info
  currentUserId: number = 0;
  currentUserRole: string = '';

  // Full and filtered list of incidents
  incidentList: any[] = [];
  filteredList: any[] = [];

  // Filter/search controls
  searchText: string = '';
  selectedStatus: string = '';
  selectedUrgency: string = '';

  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(
    private masterSrv: MasterService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Redirect to login if no user is authenticated
    const user = this.authService.getUser();
    if (!user) {
      this.router.navigate(['/login']);
      return;
    }

    // Save current user info
    this.currentUserId = user.id;
    this.currentUserRole = user.role;

    // Load incident list
    this.masterSrv.getAllIncidents().subscribe({
      next: (res: any[]) => {
        // Employees only see their own incidents
        const list = this.currentUserRole === 'Support Agent'
          ? res
          : res.filter(incident => incident.createdByUserId === this.currentUserId);

        this.incidentList = list;
        this.filteredList = [...this.incidentList]; // Initially unfiltered

        // Populate display names for each incident creator
        this.incidentList.forEach(incident => {
          this.masterSrv.getDisplayNameById(incident.createdByUserId).subscribe({
            next: response => {
              incident.createdByUserDisplayName = response.displayName;
            },
            error: err => this.handleError(err)
          });
        });
      },
      error: err => this.handleError(err)
    });
  }

  // Applies filters and updates the visible list
  onSearchClick() {
    const searchLower = this.searchText.toLowerCase();
    this.currentPage = 1;

    this.filteredList = this.incidentList.filter(incident => {
      const matchesText =
        !this.searchText ||
        incident.title?.toLowerCase().includes(searchLower) ||
        incident.description?.toLowerCase().includes(searchLower);

      const matchesStatus =
        !this.selectedStatus || incident.status === this.selectedStatus;

      const matchesUrgency =
        !this.selectedUrgency || incident.urgency === this.selectedUrgency;

      return matchesText && matchesStatus && matchesUrgency;
    });
  }

  // Total pages for pagination
  get totalPages(): number {
    return Math.ceil(this.filteredList.length / this.itemsPerPage);
  }

  // Get current page's incident slice
  get paginatedList(): any[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredList.slice(start, start + this.itemsPerPage);
  }

  // Generate page number array
  getPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  // Navigate to create incident page
  goToCreateIncident() {
    this.router.navigate(['/create-new-incident']);
  }

  // Navigate to edit form
  editIncident(id: number) {
    this.router.navigate(['/edit-incident', id]);
  }

  // Navigate to response form
  respondToIncident(id: number) {
    this.router.navigate(['/respond-to-incident', id]);
  }

  // Navigate to response form in view-only mode
  viewIncidentDetails(id: number) {
    this.router.navigate(['/respond-to-incident', id]);
  }

  // Delete an incident by ID (with confirmation)
  deleteIncident(id: number) {
    if (confirm('Are you sure you want to delete this incident?')) {
      this.masterSrv.deleteIncident(id).subscribe({
        next: () => {
          // Remove from list and reapply filters
          this.incidentList = this.incidentList.filter(inc => inc.id !== id);
          this.onSearchClick();
        },
        error: err => this.handleError(err)
      });
    }
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
