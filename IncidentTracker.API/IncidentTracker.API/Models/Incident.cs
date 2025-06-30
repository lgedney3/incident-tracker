using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IncidentTracker.API.Models
{
    // Represents an incident report in the system
    // Associated database table: 'Incidents'
    [Table("Incidents")]
    public class Incident
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public string Title { get; set; } = string.Empty;
        [Required]
        public string Description { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        [Required]
        public string Urgency { get; set; } = string.Empty;
        [Required]
        public string Status { get; set; } = string.Empty;
        [Required]
        public DateTime CreatedAt { get; set; }
        [Required]
        public int CreatedByUserId { get; set; }
        [Required]
        public DateTime LastUpdatedAt { get; set; }
    }
}
