# Incident Tracker

A full-stack CRUD web application for tracking IT/facility incidents. Built with:

- **Frontend**: Angular 18  
- **Backend**: .NET 8 Web API  
- **Database**: SQL Server

---

## Project Structure

```
incident-tracker/
├── IncidentTracker.API/             # .NET 8 backend
├── IncidentTracker_angular18/       # Angular 18 frontend
├── IncidentTracker_database/        # SQL Script to Seed DB
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js 20+ and NPM 10+
- Angular CLI: `npm install -g @angular/cli`
- .NET 8 SDK
- SQL Server (LocalDB, Express, or Developer Edition)
- Visual Studio 2022+
- SQL Server Management Studio (recommended)

---

### Database Setup

1. Open **SQL Server Management Studio**.
2. Connect to your local SQL Server instance.
3. Create a new database and name it `IncidentTrackerDb`.
4. Open the file `IncidentTracker_database/IncidentTrackerDb.sql`.
5. Run the script to seed the database.

---

### Backend Setup (IncidentTracker.API)

1. Open `IncidentTracker.API` in **Visual Studio**.
2. Configure the connection string in `appsettings.json`:
   ```json
   "ConnectionStrings": {
     "IncidentTrackerDbConnection": "Server=YOUR_SQL_SERVER;Database=IncidentTrackerDb;Trusted_Connection=True;TrustServerCertificate=True;"
   }
3. Launch the project (F5 or run from terminal):
   ```bash
   dotnet run --project IncidentTracker.API
   ```

---

### Frontend Setup (IncidentTracker_angular18)

1. Open a terminal and go to the frontend folder:
   ```bash
   cd IncidentTracker\IncidentTracker_angular18
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Angular Dev server:
   ```bash
   ng serve
   ```
4. Open your browser and go to:
   [http://localhost:4200](http://localhost:4200)

---

## Features

 - Employees can view, create, edit, and delete incidents
 - Support agents can update incident status
 - Tracks incident history and timestamps

---

## Note
 - The API defaults to [https://localhost:7057](https://localhost:7057).
