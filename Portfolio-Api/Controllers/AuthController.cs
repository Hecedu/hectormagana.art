using Google.Apis.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Portfolio_Api.Models;
using Portfolio_Api.Services;
using static checkers_api.Services.AuthService;

namespace checkers_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ILogger<AuthController> logger;
        private readonly IAuthService authService;
        private readonly IConfiguration configuration;

        public AuthController(ILogger<AuthController> logger, IAuthService authService, IConfiguration configuration)
        {
            this.logger = logger;
            this.authService = authService;
            this.configuration = configuration;
        }
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody] AuthenticateRequest data)
        {
            GoogleJsonWebSignature.ValidationSettings settings = new GoogleJsonWebSignature.ValidationSettings();
            settings.Audience = new List<string>() { configuration.GetSection("AppSettings:GoogleId").Value };

            GoogleJsonWebSignature.Payload payload = GoogleJsonWebSignature.ValidateAsync(data.IdToken, settings).Result;
            var authtoken = authService.CreateToken(payload.Email);
            return Ok(new { AuthToken = authService.CreateToken(payload.Email) });
        }
    }
}