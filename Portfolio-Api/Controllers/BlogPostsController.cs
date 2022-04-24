using Microsoft.AspNetCore.Mvc;
using Portfolio_Api.Models;
using Portfolio_Api.Services;
using Portfolio_Api.Models.RequestModels;
using Microsoft.AspNetCore.Authorization;
using Portfolio_Api.Services.Repositories;

namespace Portfolio_Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BlogPostsController : ControllerBase
    {
        private IBlogPostRepository blogPostRepository;
        public BlogPostsController(IBlogPostRepository blogPostRepository)
        {
            this.blogPostRepository = blogPostRepository;
        }

        [HttpPost]
        [Route("AddBlogPost"), Authorize(Roles = "Admin")]
        public async Task<IActionResult> AddBlogPost([FromBody] BlogPostRequest unvalidatedBlogPost)
        {
            var validatedBlogPost = new BlogPost()
                .setTitle(unvalidatedBlogPost.title ?? throw new ArgumentNullException())
                .setContent(unvalidatedBlogPost.content ?? throw new ArgumentNullException());

            await blogPostRepository.AddBlogPostAsync(validatedBlogPost);
            return Ok();
        }

        [HttpGet]
        [Route("GetBlogPosts"), AllowAnonymous]
        public IEnumerable<BlogPost> GetBlogPosts()
        {
            return blogPostRepository.GetBlogPosts();
        }
    }
}
