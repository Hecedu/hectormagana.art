using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Portfolio_Api.Models;
using Portfolio_Api.Models.RequestModels;
using Portfolio_Api.Services.Repositories;

namespace Portfolio_Api.Controllers
{
    [ApiController]
    [Route("[controller]")]    
    public class ProjectPostsController : ControllerBase
    {
        private IProjectPostRepository projectPostRepository;
        public ProjectPostsController(IProjectPostRepository projectPostRepository)
        {
            this.projectPostRepository = projectPostRepository;
        }

        [HttpPost]
        [Route("AddProjectPost"), Authorize(Roles = "Admin")]
        public async Task<IActionResult> AddBlogPost([FromBody] ProjectPostRequest unvalidatedProjectPost)
        {
            var validatedProjectPost = new ProjectPost()
                .setTitle(unvalidatedProjectPost.title ?? throw new ArgumentNullException())
                .setContent(unvalidatedProjectPost.content ?? throw new ArgumentNullException())
                .setExtraInfo(unvalidatedProjectPost.extra_info ?? throw new ArgumentNullException())
                .setImageUrl(unvalidatedProjectPost.image_url ?? throw new ArgumentNullException());

            await projectPostRepository.AddProjectPostAsync(validatedProjectPost);
            return Ok();
        }

        [HttpGet]
        [AllowAnonymous]
        public IEnumerable<ProjectPost> GetBlogPosts()
        {
            return projectPostRepository.GetProjectPosts();
        }

    }
}