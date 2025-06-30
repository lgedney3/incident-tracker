using IncidentTracker.API.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace IncidentTracker.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("allowCors")]
    public class IncidentTrackerMasterController : ControllerBase
    {
        private readonly IncidentTrackerDbContext _context;

        public IncidentTrackerMasterController(IncidentTrackerDbContext context)
        {
            _context = context;
        }

        // Incident Endpoints -------------------------------------

        // Get all incidents, ordered by most recently updated
        [HttpGet("incidents")]
        public ActionResult<List<Incident>> GetAllIncidents()
        {
            var incidents = _context.Incidents
                .OrderByDescending(x => x.LastUpdatedAt)
                .ToList();

            return Ok(incidents);
        }

        // Get a single incident by ID
        [HttpGet("incidents/{id}")]
        public ActionResult<Incident> GetIncidentById(int id)
        {
            var incident = _context.Incidents.FirstOrDefault(x => x.Id == id);
            if (incident == null)
                return NotFound("No incident found with the given ID.");

            return Ok(incident);
        }

        // Create a new incident
        [HttpPost("incidents")]
        public ActionResult<Incident> CreateNewIncident(Incident incident)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            incident.CreatedAt = DateTime.Now;
            incident.LastUpdatedAt = DateTime.Now;

            _context.Incidents.Add(incident);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetIncidentById), new { id = incident.Id }, incident);
        }

        // Update an existing incident
        [HttpPut("incidents")]
        public ActionResult<Incident> UpdateIncident(Incident incident)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var record = _context.Incidents.FirstOrDefault(x => x.Id == incident.Id);
            if (record == null)
                return NotFound("Incident not found.");

            record.Title = incident.Title;
            record.Description = incident.Description;
            record.Location = incident.Location;
            record.Urgency = incident.Urgency;
            record.Status = incident.Status;
            record.LastUpdatedAt = DateTime.Now;

            _context.SaveChanges();

            return Ok(record);
        }

        // Delete an incident by ID
        [HttpDelete("incidents/{id}")]
        public ActionResult DeleteIncidentById(int id)
        {
            var record = _context.Incidents.FirstOrDefault(x => x.Id == id);
            if (record == null)
                return NotFound("Incident not found.");

            _context.Incidents.Remove(record);
            _context.SaveChanges();

            return NoContent();
        }

        // User Endpoints -------------------------------------

        // Create a new user
        [HttpPost("users")]
        public ActionResult<User> CreateNewUser(User user)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _context.Users.Add(user);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetUserByEmail), new { email = user.Email }, user);
        }

        // Get all users
        [HttpGet("users")]
        public ActionResult<List<User>> GetAllUsers()
        {
            var users = _context.Users.ToList();
            return Ok(users);
        }

        // Get a user by email address
        [HttpGet("users/by-email")]
        public async Task<ActionResult<User>> GetUserByEmail([FromQuery] string email)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == email);
            if (user == null)
                return NotFound("User not found.");

            return Ok(user);
        }

        // Check if an email is already in use
        [HttpGet("users/exists")]
        public async Task<ActionResult<bool>> CheckIfEmailExists([FromQuery] string email)
        {
            var exists = await _context.Users.AnyAsync(x => x.Email == email);
            return Ok(exists);
        }

        // Get a user's display name by their ID
        [HttpGet("users/{id}/display-name")]
        public ActionResult GetDisplayNameById(int id)
        {
            var user = _context.Users.FirstOrDefault(u => u.Id == id);
            if (user == null)
                return NotFound("User not found.");

            return Ok(new { displayName = user.DisplayName });
        }

        // Status Change Endpoints ----------------------------

        // Create a new status change entry
        [HttpPost("incidents/status-changes")]
        public ActionResult<StatusChange> CreateNewStatusChange(StatusChange statusChange)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            statusChange.ChangedAt = DateTime.Now;

            _context.StatusChanges.Add(statusChange);
            _context.SaveChanges();

            return Ok(statusChange);
        }

        // Get status change history for a given incident
        [HttpGet("incidents/{incidentId}/status-changes")]
        public ActionResult<List<StatusChange>> GetStatusHistoryByIncidentId(int incidentId)
        {
            var history = _context.StatusChanges
                .Where(s => s.IncidentId == incidentId)
                .OrderBy(s => s.ChangedAt)
                .ToList();

            return Ok(history);
        }
    }
}




