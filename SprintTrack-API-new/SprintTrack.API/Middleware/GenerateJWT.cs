using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace SprintTrack.API.Middleware
{
    public class GenerateJWT
    {

        private readonly IConfiguration _config;
        public GenerateJWT(IConfiguration config)
        {
            _config = config;
        }
        public string GenerateJwtToken(string username, string role)
        {
            var secretKey = _config["JwtSettings:SecretKey"];

            if (string.IsNullOrEmpty(secretKey))
                throw new Exception("JWT SecretKey is missing in configuration.");

            var key = Encoding.UTF8.GetBytes(secretKey);


            var claims = new[]
            {
            new Claim(ClaimTypes.Name, username),
            new Claim(ClaimTypes.Role, role)
            };

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.UtcNow.AddHours(2),
                signingCredentials: new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
    
}
