using Portfolio_Api.Services;
using System.ComponentModel.DataAnnotations;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

namespace Portfolio_Api.Services
{
    public class AuthService : IAuthService
    {
        private readonly IRepository repository;
        private readonly IConfiguration configuration;

        public AuthService(IConfiguration configuration, IRepository repository)
        {
            this.configuration = configuration;
            this.repository = repository;
        }
        public class AuthenticateRequest
        {
            [Required]
            public string IdToken { get; set; }
        }

        public async Task<string> CreateValidTokenAsync(string email)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, email),
                new Claim(ClaimTypes.Role, "User")
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(Environment.GetEnvironmentVariable("JwtKey")));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds);

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            await repository.AddValidTokenAsync(jwt);
            return jwt;
        }
        public async Task RemoveValidTokenAsync(string token)
        {
            await repository.RemoveValidTokenAsync(token);
        }
    }
}
