using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace SprintTrack.API.Controller
{
    [Authorize(Roles = "Admin")]
    [Route("api/admin")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        [HttpGet("dashboard")]
        public IActionResult GetAdminDashboard()
        {
            return Ok(new { message = "Welcome, Admin!" });
        }
    }
}
