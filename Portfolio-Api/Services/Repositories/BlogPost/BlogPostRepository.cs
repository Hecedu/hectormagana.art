using Microsoft.EntityFrameworkCore;
using Portfolio_Api.Models;

namespace Portfolio_Api.Services.Repositories
{
    public class BlogPostRepository : IBlogPostRepository
    {
        private readonly IConfiguration configuration;
        private readonly PortfolioDbContext _context;

        public BlogPostRepository(IConfiguration configuration, PortfolioDbContext context)
        {
            this.configuration = configuration;
            _context = context;
        }

        public async Task AddBlogPostAsync(BlogPost blogPost)
        {
            _context.blogposts.Add(blogPost);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteBlogPostAsync(BlogPost blogPost)
        {
            _context.blogposts.Remove(blogPost);
            await _context.SaveChangesAsync();
        }

        public async Task EditBlogPostAsync(BlogPost blogPost)
        {
            _context.blogposts.Update(blogPost);
            await _context.SaveChangesAsync();
        }

        public async Task<BlogPost> GetBlogPostAsync(int id)
        {
            return await _context.blogposts.FirstAsync(blogPost => blogPost.id == id);
        }

        public IEnumerable<BlogPost> GetBlogPosts()
        {
            return _context.blogposts.ToList();
        }
    }
}
