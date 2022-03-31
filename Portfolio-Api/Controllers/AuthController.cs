using Google.Apis.Auth;
using Microsoft.AspNetCore.Mvc;
using Portfolio_Api.Services;
using static Portfolio_Api.Services.AuthService;

namespace Portfolio_Api.Controllers
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
        [HttpPost("Authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] AuthenticateRequest data)
        {
            GoogleJsonWebSignature.ValidationSettings settings = new GoogleJsonWebSignature.ValidationSettings();
            settings.Audience = new List<string>() { configuration.GetSection("AppSettings:GoogleId").Value };

            GoogleJsonWebSignature.Payload payload = GoogleJsonWebSignature.ValidateAsync(data.IdToken, settings).Result;
            return Ok(new { AuthToken = await authService.CreateValidTokenAsync(payload.Email)});
        }

        [HttpDelete("InvalidateBearerToken")]
        public async Task<IActionResult> InvalidateBearerToken (string bearer)
        {
            await authService.RemoveValidTokenAsync(bearer);
            return Ok();
        }
    }
}