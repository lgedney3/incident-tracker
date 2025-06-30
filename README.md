# Incident Tracker

A full-stack CRUD web application for tracking IT/facility incidents. Built with:

- **Frontend**: Angular 18  
- **Backend**: .NET 8 Web API  
- **Database**: SQL Server (LocalDB or Express)

---

## Project Structure

incident-tracker/
├── IncidentTracker.API/ # .NET 8 backend
├── incident-tracker-frontend/ # Angular 18 frontend
├── IncidentTracker_database/ # SQL Server .bak file
└── README.md

---

## Getting Started

### Prerequisites

- Node.js 20+ and NPM 10+
- Angular CLI (`npm install -g @angular/cli`)
- .NET 8 SDK
- SQL Server (LocalDB, Express, or Developer Edition)
- Visual Studio 2022+ (recommended)

---

### Database Setup

1. Open **SQL Server Management Studio (SSMS)**.
2. Right-click on `Databases` → `Restore Database...`.
3. Select:
   - **Source** → *Device* → Browse to `IncidentTracker_database/IncidentTrackerDb.bak`
4. Click OK to restore.

---

### Backend Setup (IncidentTracker.API)

1. Open `IncidentTracker.API` in **Visual Studio**.
2. Configure the connection string in `appsettings.json`:
   ```json
   "ConnectionStrings": {
     "IncidentTrackerDbConnection": "Server=YOUR_SQL_SERVER;Database=IncidentTrackerDb;Trusted_Connection=True;TrustServerCertificate=True;"
   }
4. Launch the project (F5 or run from terminal):
   dotnet run --project IncidentTracker.API

---

### Frontend Setup (IncidentTracker_angular18)

1. Open a terminal and go to the frontend folder:
   cd IncidentTracker\IncidentTracker_angular18
2. Install dependencies:
   npm install
3. Start the Angular Dev server:
   ng serve
4. Open your browser and go to:
   http://localhost:4200

---

## Features

 - Employees can view, create, edit, and delete incidents
 - Support agents can update incident status
 - Tracks incident history and timestamps

---

## Notes
 - .bak file is included in /IncidentTracker_database for easy DB setup
 - The API defaults to https://localhost:7057
