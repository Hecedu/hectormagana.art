using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Portfolio_Api.Models;
using Portfolio_Api.Services;

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
        [Route("AddBlogPost")]
        public async Task<IActionResult> AddBlogPost ([FromBody] BlogPost blogPost)
        {
            var SanitizedBlogPost = new BlogPost (0)
            {
                title = blogPost.title,
                content = blogPost.content,
            };
            await _repository.AddBlogPostAsync(SanitizedBlogPost);
            return Ok();
        }

        [HttpGet]
        [Route("GetBlogPosts")]
        public IEnumerable<BlogPost> GetBlogPosts()
        {
            return _repository.GetBlogPosts();
        }
    }
}
