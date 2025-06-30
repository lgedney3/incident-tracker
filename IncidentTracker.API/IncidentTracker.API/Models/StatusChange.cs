using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IncidentTracker.API.Models
{
    // Represents a status change for an incident
    // Associated database table: 'StatusHistory'
    [Table("StatusHistory")]
    public class StatusChange
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public int IncidentId { get; set; }
        [Required]
        public string FromStatus { get; set; } = string.Empty;
        [Required]
        public string ToStatus { get; set; } = string.Empty;
        [Required]
        public DateTime ChangedAt { get; set; }
        [Required]
        public int ChangedByUserId { get; set; }
        public string Note { get; set; } = string.Empty;
    }
}
