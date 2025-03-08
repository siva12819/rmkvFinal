using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace SprintTrack.API.Controller
{
    [Authorize(Roles = "User")]
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        [HttpGet("dashboard")]
        public IActionResult GetUserDashboard()
        {
            return Ok(new { message = "Welcome, User!" });
        }
    }
}
