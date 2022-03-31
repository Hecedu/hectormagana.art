using Microsoft.AspNetCore.Mvc;
using Portfolio_Api.Models;
using Portfolio_Api.Services;
using Portfolio_Api.Models.RequestModels;
using Microsoft.AspNetCore.Authorization;

namespace Portfolio_Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BlogPostsController : ControllerBase
    {
        private IRepository _repository;
        public BlogPostsController(IRepository repository)
        {
            _repository = repository;
        }

        [HttpPost]
        [Route("AddBlogPost"), Authorize(Roles = "Admin")]
        public async Task<IActionResult> AddBlogPost([FromBody] BlogPostRequest unvalidatedBlogPost)
        {
            var validatedBlogPost = new BlogPost()
                .setTitle(unvalidatedBlogPost.title)
                .setContent(unvalidatedBlogPost.content);

            await _repository.AddBlogPostAsync(validatedBlogPost);
            return Ok();
        }

        [HttpGet]
        [Route("GetBlogPosts"), Authorize(Roles = "Admin")]
        public IEnumerable<BlogPost> GetBlogPosts()
        {
            return _repository.GetBlogPosts();
        }
    }
}
