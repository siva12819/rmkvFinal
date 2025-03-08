using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using SprintTrack.API.Middleware;
using SprintTrack.Application.Services;
using SprintTrack.Common.CommonMiddleware;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace SprintTrack.API.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly GenerateJWT _token;
        private readonly IMediator _mediator;

        public AuthController(IConfiguration config,GenerateJWT token, IMediator mediator)
        {
            _config = config;
            _token = token;
            _mediator = mediator;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] getUserService values)
        {
            var resultJson = await _mediator.Send(values);
            //return Ok(result);

            if (resultJson.Contains("Invalid password") || resultJson.Contains("User not found"))
            {
                return Unauthorized(resultJson);
            }

            var result = JsonConvert.DeserializeObject<dynamic>(resultJson);
            
            var token = _token.GenerateJwtToken(values.Username, (string)result.role);
            var user = new
            {
                username = (string)result.username,
                role = (string)result.role,
                name = (string)result.name,
                email = (string)result.email,
                jwtToken = token
            };

            return Ok(user);
        }

    }
}
