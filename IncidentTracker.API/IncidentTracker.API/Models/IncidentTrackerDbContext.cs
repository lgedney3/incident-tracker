using Microsoft.EntityFrameworkCore;

namespace IncidentTracker.API.Models
{
    // Entity Framework database context
    // Manages access to Users, Incidents, and StatusHistory tables
    public class IncidentTrackerDbContext : DbContext
    {
        public IncidentTrackerDbContext(DbContextOptions<IncidentTrackerDbContext> options) : base(options) 
        {
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Incident> Incidents { get; set; }
        public DbSet<StatusChange> StatusChanges { get; set; }
    }
}
