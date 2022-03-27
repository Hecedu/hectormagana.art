using System.Reflection.Metadata.Ecma335;
using Portfolio_Api.Services;
using Portfolio_Api.Models;
using Google.Apis.Auth;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

namespace checkers_api.Services;

public class AuthService : IAuthService
{
    private readonly IRepository repository;
    private readonly IConfiguration configuration;
    private string clientId = "216463964469-1uop6pd4rfv1e8e2i2ajk585hl51g8o2.apps.googleusercontent.com";

    public AuthService(IConfiguration configuration, IRepository repository, ILogger<AuthService> logger)
    {
        this.configuration = configuration;
        this.repository = repository;
    }
    public class AuthenticateRequest
    {
        [Required]
        public string IdToken { get; set; }
    }

    private async Task<UserData> registerUserAsync(GoogleJsonWebSignature.Payload payload)
    {
        try
        {
            var user = new UserData(payload.Name,payload.Email);
            await repository.AddUserData(user);
            return user;
        }
        catch
        {
            throw;
        }
    }

    string IAuthService.CreateToken(string email)
    {
        List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, email),
                new Claim(ClaimTypes.Role, "User")
            };

        var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(configuration.GetSection("AppSettings:Token").Value));

        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

        var token = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.Now.AddDays(1),
            signingCredentials: creds);

        var jwt = new JwtSecurityTokenHandler().WriteToken(token);

        return jwt;
    }
}
